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
- Fresh install: the full `CREATE TABLE` block handles everything.
- Existing table: run the `-- Migration` section at the bottom of the file.

---

## 2. Admin auth flow

### Login
```bash
curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{ "password": "yourpassword" }' \
  -c /tmp/wedding-admin.txt | jq
# Expected: { "ok": true }
```

### Fetch contact requests
```bash
curl -s http://localhost:3000/api/admin/contact-requests \
  -b /tmp/wedding-admin.txt | jq
# Expected: { "ok": true, "data": [ ... ] }
```

### Unauthorized (no cookie)
```bash
curl -s http://localhost:3000/api/admin/contact-requests | jq
# Expected: { "ok": false, "error": "Unauthorized." }
```

### Logout
```bash
curl -s -X POST http://localhost:3000/api/admin/logout \
  -b /tmp/wedding-admin.txt \
  -c /tmp/wedding-admin.txt | jq
# Expected: { "ok": true }
```

---

## 3. Valid lodging combinations

### Condo only, sharing preference = yes
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Guest",
    "email": "jane@example.com",
    "interestedInVenueCondo": true,
    "interestedInNearbyHotel": false,
    "lodgingInterestNotSure": false,
    "condoSharingPreference": "yes"
  }' | jq
# Expected: { "ok": true }
```

### Hotel only
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Bob Guest",
    "email": "bob@example.com",
    "interestedInVenueCondo": false,
    "interestedInNearbyHotel": true,
    "lodgingInterestNotSure": false
  }' | jq
# Expected: { "ok": true }
```

### Condo + hotel, sharing preference = not_sure
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Sam Guest",
    "email": "sam@example.com",
    "interestedInVenueCondo": true,
    "interestedInNearbyHotel": true,
    "lodgingInterestNotSure": false,
    "condoSharingPreference": "not_sure"
  }' | jq
# Expected: { "ok": true }
```

### Not sure yet
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Alex Guest",
    "email": "alex@example.com",
    "interestedInVenueCondo": false,
    "interestedInNearbyHotel": false,
    "lodgingInterestNotSure": true
  }' | jq
# Expected: { "ok": true }
```

---

## 4. Invalid lodging combinations

### No lodging option selected
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Guest",
    "email": "jane@example.com",
    "interestedInVenueCondo": false,
    "interestedInNearbyHotel": false,
    "lodgingInterestNotSure": false
  }' | jq
# Expected: { "ok": false, "error": "Invalid request data." }
```

### Not sure + hotel (mutually exclusive)
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Guest",
    "email": "jane@example.com",
    "interestedInVenueCondo": false,
    "interestedInNearbyHotel": true,
    "lodgingInterestNotSure": true
  }' | jq
# Expected: { "ok": false, "error": "Invalid request data." }
```

### Condo selected but condoSharingPreference missing
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Guest",
    "email": "jane@example.com",
    "interestedInVenueCondo": true,
    "interestedInNearbyHotel": false,
    "lodgingInterestNotSure": false
  }' | jq
# Expected: { "ok": false, "error": "Invalid request data." }
```

### Condo not selected but condoSharingPreference provided
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Guest",
    "email": "jane@example.com",
    "interestedInVenueCondo": false,
    "interestedInNearbyHotel": true,
    "lodgingInterestNotSure": false,
    "condoSharingPreference": "yes"
  }' | jq
# Expected: { "ok": false, "error": "Invalid request data." }
```

---

## 5. Honeypot test

Bots that fill the honeypot field get a silent `{ "ok": true }` but nothing is stored:
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{ "fullName": "Bot", "email": "bot@spam.com", "honeypot": "I am a bot",
        "interestedInVenueCondo": false, "interestedInNearbyHotel": false,
        "lodgingInterestNotSure": true }' | jq
# Expected: { "ok": true } (no database insert)
```

---

## 6. Other validation errors

Missing required fields return 400:
```bash
curl -s -X POST http://localhost:3000/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{ "fullName": "", "email": "not-an-email" }' | jq
# Expected: { "ok": false, "error": "Invalid request data." }
```
