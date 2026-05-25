# API Testing — Save-the-Date Contact System

## 1. First-time setup

### Generate the admin password hash
```bash
node scripts/hash-password.mjs yourpassword
# Copy the output into .env as ADMIN_PASSWORD_HASH
```

### Generate a session secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the output into .env as ADMIN_SESSION_SECRET
```

### Apply the database schema
Run `supabase/schema.sql` in the Supabase SQL editor for your project.

---

## 2. curl examples (dev server running at localhost:3000)

### Submit a contact request (public)
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Guest",
    "email": "jane@example.com",
    "phone": "+1 555 000 0000",
    "message": "So excited to celebrate with you!",
    "honeypot": ""
  }' | jq
# Expected: { "ok": true }
```

### Admin login
```bash
curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{ "password": "yourpassword" }' \
  -c /tmp/wedding-admin.txt | jq
# Expected: { "ok": true }
# Cookie is saved to /tmp/wedding-admin.txt
```

### Fetch contact requests (admin, using saved cookie)
```bash
curl -s http://localhost:3000/api/admin/contact-requests \
  -b /tmp/wedding-admin.txt | jq
# Expected: { "ok": true, "data": [ ... ] }
```

### Attempt without a cookie (should 401)
```bash
curl -s http://localhost:3000/api/admin/contact-requests | jq
# Expected: { "ok": false, "error": "Unauthorized." }
```

### Admin logout
```bash
curl -s -X POST http://localhost:3000/api/admin/logout \
  -b /tmp/wedding-admin.txt \
  -c /tmp/wedding-admin.txt | jq
# Expected: { "ok": true }
# Cookie is now expired
```

### Verify cookie is cleared (should 401 again)
```bash
curl -s http://localhost:3000/api/admin/contact-requests \
  -b /tmp/wedding-admin.txt | jq
# Expected: { "ok": false, "error": "Unauthorized." }
```

---

## 3. Honeypot test

Bots that fill the honeypot field get a silent `{ "ok": true }` but nothing is stored:
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{ "fullName": "Bot", "email": "bot@spam.com", "honeypot": "I am a bot" }' | jq
# Expected: { "ok": true } (no database insert)
```

---

## 4. Validation errors

Missing required fields return 400:
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{ "fullName": "", "email": "not-an-email" }' | jq
# Expected: { "ok": false, "error": "Invalid request data." }
```
