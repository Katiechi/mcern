<?php
// M-CERN contact form handler.
// Receives POST from /contact (React form), emails info@mcern.org via cPanel mail().

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

// To change the recipient later, edit this constant.
const RECIPIENT = 'info@mcern.org';
const SITE_NAME = 'M-CERN';

function fail(int $status, string $message): void {
  http_response_code($status);
  echo json_encode(['ok' => false, 'error' => $message]);
  exit;
}

function ok(string $message): void {
  http_response_code(200);
  echo json_encode(['ok' => true, 'message' => $message]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  fail(405, 'Method not allowed.');
}

// Same-origin check: reject form posts from other domains.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
$expected = 'https://' . $host;
$expectedAlt = 'http://' . $host;
if ($origin !== '' && $origin !== $expected && $origin !== $expectedAlt) {
  fail(403, 'Bad origin.');
}
if ($origin === '' && $referer !== '' && stripos($referer, $expected) !== 0 && stripos($referer, $expectedAlt) !== 0) {
  fail(403, 'Bad referer.');
}

// Honeypot: bots typically fill every field. A non-empty bot-field means spam.
$honeypot = trim((string)($_POST['bot-field'] ?? ''));
if ($honeypot !== '') {
  // Pretend success so bots don't retry.
  ok('Thanks — we will be in touch.');
}

// Required fields.
$name    = trim((string)($_POST['name']    ?? ''));
$email   = trim((string)($_POST['email']   ?? ''));
$phone   = trim((string)($_POST['phone']   ?? ''));
$subject = trim((string)($_POST['subject'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === ''    || mb_strlen($name)    > 100)  fail(400, 'Invalid name.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 255) fail(400, 'Invalid email.');
if (mb_strlen($phone) > 30)                        fail(400, 'Invalid phone.');
if ($subject === '' || mb_strlen($subject) > 50)   fail(400, 'Invalid subject.');
if (mb_strlen($message) < 10 || mb_strlen($message) > 1000) fail(400, 'Message must be 10–1000 characters.');

// Header injection defence: reject anything with CR/LF in single-line fields.
foreach ([$name, $email, $phone, $subject] as $field) {
  if (preg_match('/[\r\n]/', $field)) fail(400, 'Invalid characters detected.');
}

// Build the email.
$mailTo      = RECIPIENT;
$mailSubject = sprintf('[%s Website] %s — %s', SITE_NAME, $subject, $name);
$mailBody    = "You have a new message from the " . SITE_NAME . " website.\n\n"
             . "Name:    {$name}\n"
             . "Email:   {$email}\n"
             . "Phone:   " . ($phone === '' ? '—' : $phone) . "\n"
             . "Subject: {$subject}\n\n"
             . "Message:\n{$message}\n";

$fromAddr = 'info@' . preg_replace('/^www\./i', '', $host);
$headers  = [
  'From: ' . SITE_NAME . ' Website <' . $fromAddr . '>',
  'Reply-To: ' . $name . ' <' . $email . '>',
  'X-Mailer: PHP/' . phpversion(),
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($mailTo, $mailSubject, $mailBody, implode("\r\n", $headers), '-f' . $fromAddr);

if (!$sent) fail(500, 'Could not send message. Please try again or email us directly.');

ok('Thanks — we will get back to you within 2–3 business days.');
