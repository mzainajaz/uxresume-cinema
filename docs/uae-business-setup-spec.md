# UAE Business Setup SaaS – Full Product & Technical Specification

**Assumptions**
- Payment gateway: Stripe with AED multi-currency support, VAT charged at 5% when customer provides UAE billing address + TRN; otherwise zero-rated consultation.
- WhatsApp BSP: 360dialog with dedicated Dubai (+971) number.
- Initial free zones: IFZA, DMCC, RAKEZ, Dubai South, Sharjah Media City (Shams), Abu Dhabi Global Market (ADGM) plus Dubai Mainland (DED).
- Single-tenant SaaS with future workspace abstraction for agencies.
- Branding TBD; placeholder colors: primary `#004C97`, secondary `#F5A623`.

---

## 1. Product Scope & UX

### 1.1 Roles & Permissions
| Role | Capabilities |
| --- | --- |
| Guest | View marketing pages, submit lead form, start WhatsApp chat |
| Lead (unverified) | Access onboarding wizard, save draft intake, receive payment link |
| Customer | Access dashboard, pay consultation, view recommendations, upload documents, track case |
| Ops Agent | Manage leads/customers, review KYC, trigger calls, moderate reviews, edit jurisdiction data |
| Admin | All Ops Agent permissions + manage roles, billing, system settings, feature flags, audit logs |

### 1.2 Primary User Stories
1. **Lead submits interest** via marketing landing page (English/Arabic) capturing name, email, phone, preferred language, business idea.
2. **Lead books consultation** through onboarding wizard, reviews recommended jurisdictions, confirms appointment slot, receives payment link.
3. **Lead pays 200 AED consultation fee** (Stripe Checkout), receives VAT invoice.
4. **Automatic WhatsApp + Vapi follow-up**: Post-payment, WhatsApp assistant sends welcome, Vapi schedules callback with Ops Agent.
5. **Selects free zone vs mainland**: Wizard comparison displays top 3 fits; lead saves plan and requests call.
6. **Uploads KYC documents** (passport, utility bill) via secure portal; Ops Agent reviews, requests additional docs.
7. **Tracks case status** through dashboard timeline (Intake → Consultation → Proposal → Licensing → Visa).

### 1.3 Onboarding Wizard Flow
1. Step 1: "Describe your business" (activity keywords, target markets, planned employees).
2. Step 2: "Suggested legal structures" (sole proprietor, FZ-LLC, Mainland LLC) with pros/cons.
3. Step 3: "Free Zone vs Mainland" comparison (fees, visas, timeline) with scoring badges.
4. Step 4: "Fee estimate" summarizing consultation fee, licensing estimate, visa bundle.
5. Step 5: "Secure payment" (200 AED) + calendar slot selection for consultation call.

### 1.4 WhatsApp Conversational Flows
- **Greeting**: "Marhaba {name}! I'm your UAE Business Setup assistant..."
- **Qualification**: Ask business type, budget, preferred emirate; store responses.
- **Payment prompt**: Send Stripe Checkout link; confirm payment receipt.
- **Document checklist**: After payment, send localized checklist (passport, photo, business plan).
- **Status updates**: Notify on consultation booking, call reminders, review ingestion.

### 1.5 Empty/Error/Success States
- **Dashboard empty**: "No consultation booked yet. Complete the wizard to unlock tailored recommendations." / Arabic equivalent.
- **Recommendations missing**: Display fallback with CTA "Speak with an expert" and direct WhatsApp deep link.
- **Payment failure**: Show error card with retry + support email.
- **Success confirmations**: Toast + email for payment, document upload success, call scheduled.

### 1.6 Microcopy Examples
- English: "Secure your consultation – AED 200 (refundable if we cannot serve you)."
- Arabic (RTL): "احجز استشارتك الآن – ‎٢٠٠ د.إ (قابلة للاسترداد إذا تعذّر تقديم الخدمة)."

---

## 2. Free Zone vs Mainland Comparison Engine

### 2.1 Scoring Model
- Inputs: `business_activity`, `target_emirate`, `monthly_budget`, `desired_visa_count`, `urgency_days`.
- Scoring = weighted sum (0–100) with weights: Activity fit 35%, Emirate preference 20%, Budget alignment 15%, Visa capacity 15%, Processing speed 15%.
- Activity fit derived from taxonomy mapping (NAICS-like codes to jurisdiction allowed activities).
- Budget alignment: Penalty if setup fee exceeds budget threshold (tiered: <10%, 10-25%, >25%).
- Processing speed: Compare `processing_days` to `urgency_days`.

### 2.2 Comparison Attributes Table
| Attribute | Description |
| --- | --- |
| setup_fee_aed | Base licensing cost first year |
| renewal_fee_aed | Annual renewal |
| visa_quota | Included visas |
| visa_additional_cost | Cost per additional visa |
| office_options | Flexi desk, dedicated office, virtual office |
| processing_days | Typical licensing timeframe |
| allowed_activities | Tags array |
| foreign_ownership | % allowed |
| capital_requirement | Minimum share capital |
| compliance_notes | Audit, reporting obligations |
| addons | Bank account support, PRO services |

### 2.3 Jurisdiction Config Schema (JSON)
```json
{
  "code": "IFZA",
  "name": {"en": "IFZA Dubai", "ar": "منطقة إفزا"},
  "emirate": "Dubai",
  "type": "free_zone",
  "attributes": {
    "setup_fee_aed": 12500,
    "renewal_fee_aed": 11500,
    "visa_quota": 3,
    "visa_additional_cost": 3500,
    "office_options": ["Flexi Desk", "Dedicated Office"],
    "processing_days": 7,
    "allowed_activities": ["consulting", "trading", "tech"],
    "foreign_ownership": 100,
    "capital_requirement": 0,
    "compliance_notes": "No audit first year",
    "addons": ["Corporate bank intro", "Visa stamping support"]
  },
  "constraints": {
    "visa_limit_max": 6,
    "shareholder_min_age": 18
  },
  "local_partners_required": false
}
```

### 2.4 Fallback Behavior
- If attribute missing, display "Consult our specialists" banner; default to median values for scoring but flag uncertainty.
- CTA: "Schedule a call" linking to Ops agent scheduling.
- Disclaimer: "Data subject to change. Final pricing confirmed during consultation."

### 2.5 Sample Dataset (Mock)
| Code | Name | Type | Setup Fee (AED) | Visa Quota | Processing Days |
| --- | --- | --- | --- | --- | --- |
| IFZA | IFZA Dubai | Free Zone | 12,500 | 3 | 7 |
| DMCC | DMCC | Free Zone | 20,000 | 6 | 10 |
| RAKEZ | Ras Al Khaimah Economic Zone | Free Zone | 10,500 | 2 | 12 |
| DUBAI_SOUTH | Dubai South Business Park | Free Zone | 15,000 | 2 | 8 |
| SHAMS | Sharjah Media City | Free Zone | 8,000 | 0 | 5 |
| ADGM | Abu Dhabi Global Market | Free Zone | 30,000 | 4 | 14 |
| DED_MAINLAND | Dubai Mainland (DED) | Mainland | 18,000 | Unlimited (with office) | 5 |

---

## 3. System Architecture

### 3.1 Component Diagram
```
[Client Web/App] --HTTPS--> [Laravel App (Blade/Tailwind)]
[Client Web/App] --REST/WS--> [API / Sanctum]
[Laravel App] --Queue Jobs--> [Redis Queue + Horizon]
[Laravel App] --DB--> [MySQL 8 Cluster]
[Laravel App] --Cache--> [Redis]
[Laravel App] --Webhook Handlers--> [Vapi Service]
[Laravel App] --Webhook Handlers--> [WhatsApp BSP (360dialog)]
[Laravel App] --Webhook Handlers--> [Stripe]
[Laravel App] --Cron--> [Google Reviews Fetcher]
[Laravel App] --Outbound HTTPS--> [OpenAI Assistant Service]
[Laravel App] --File Storage--> [S3-compatible storage in UAE]
[Admin Ops Dashboard] --HTTPS--> [Laravel App]
[Observability] <-logs/metrics- [Laravel App]
```

### 3.2 Sequence Diagram (a) Lead → Consultation Purchase → WhatsApp → Vapi
1. Lead submits `/api/v1/leads` → creates `lead` + `whatsapp_session` draft.
2. System emails payment CTA + returns wizard link.
3. Lead triggers POST `/api/v1/checkout` → Stripe Checkout session (200 AED) created.
4. Stripe redirects to hosted page; on success, Stripe sends `payment_intent.succeeded` webhook → `HandleStripeWebhookJob` updates `payments`, marks `consultation` paid.
5. WhatsApp job enqueues `SendWhatsAppTemplateJob` (welcome + checklist).
6. `ScheduleVapiCallbackJob` posts to Vapi API to schedule call; Vapi callback webhook updates `vapi_calls`.

### 3.3 Sequence Diagram (b) Wizard → Compare → Save Plan → Book Call
1. Lead POST `/api/v1/intake` with business data; `IntakeRequest` validated, stored in `recommendations`.
2. `GenerateRecommendationsJob` runs scoring algorithm, persists `comparisons`.
3. Lead GET `/api/v1/recommendations` → returns ranked list with attributes.
4. Lead selects plan, POST `/api/v1/comparisons` to save choice.
5. System sends calendar options (Calendly-like integration or internal scheduling) and triggers call booking (Vapi) + email confirmation.

### 3.4 Sequence Diagram (c) Reviews Ingestion → Moderation → Display
1. Ops Agent registers Google place via POST `/api/v1/google/reviews/sources`.
2. Scheduled command hits Google Places API using stored `place_id`.
3. New reviews inserted into `reviews` table with `pending_moderation`.
4. Ops Agent reviews via admin UI, marks approved.
5. Approved reviews surface on customer dashboard widget (cached per customer).

### 3.5 Sequence Diagram (d) Refund/Chargeback Flow
1. Ops Agent initiates refund via dashboard → POST `/api/v1/payments/{id}/refund`.
2. Laravel calls Stripe API `refund` with reason.
3. Stripe sends webhook `charge.refunded`; handler updates `payments` status to `refunded`, logs audit entry, triggers WhatsApp/email notification.
4. Chargeback event `charge.dispute.created` handled similarly; Ops Agent alerted, case flagged.

### 3.6 Tenancy & Data Residency
- Single-tenant with `organizations` table to prepare for future agencies; each customer belongs to a single organization.
- Data stored in AWS me-central-1 (UAE). Daily automated snapshots + point-in-time recovery via RDS. Encrypted S3 bucket same region.

---

## 4. Data Model & Migrations

### 4.1 Core Tables Overview
| Table | Key Fields |
| --- | --- |
| users | id, organization_id, name, email, phone, password, locale, last_login_at, two_factor_secret |
| roles | id, name |
| permissions | id, name |
| model_has_roles | morphs |
| model_has_permissions | morphs |
| organizations | id, name, trn, billing_email |
| leads | id, user_id (nullable), organization_id, status, source, preferred_language |
| contacts | id, lead_id, type (email/phone), value, verified_at |
| consultations | id, lead_id, scheduled_at, status, payment_id |
| payments | id, consultation_id, amount, currency, status, stripe_payment_intent_id, receipt_url |
| invoices | id, payment_id, invoice_number, vat_amount, pdf_url |
| jurisdictions | id, code, name_en, name_ar, type, emirate, data JSON |
| jurisdiction_attributes | id, jurisdiction_id, key, value_json |
| recommendations | id, lead_id, input_json, result_json, score, jurisdiction_id |
| comparisons | id, lead_id, selected_jurisdiction_id, notes |
| google_review_sources | id, organization_id, place_id, label, last_synced_at |
| reviews | id, source_id, reviewer_name, rating, text, language, published_at, status |
| whatsapp_sessions | id, lead_id, wa_number, state, context_json |
| messages | id, session_id, direction, body, payload_json, sent_at |
| vapi_calls | id, lead_id, call_type, scheduled_at, status |
| call_records | id, vapi_call_id, duration_seconds, recording_url, summary_json |
| webhooks | id, provider, external_id, payload, processed_at |
| documents | id, lead_id, type, path, mime, status |
| audit_logs | id, actor_id, action, subject_type, subject_id, changes_json |
| consents | id, lead_id, consent_type, granted_at, revoked_at |
| api_keys | id, organization_id, name, token_hash, last_used_at |
| settings | id, key, value_json |
| feature_flags | id, key, enabled, rollout_json |

### 4.2 Migration Snippets
```php
Schema::create('organizations', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('trn')->nullable()->index();
    $table->string('billing_email');
    $table->timestamps();
    $table->softDeletes();
});

Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->foreignId('organization_id')->nullable()->constrained()->nullOnDelete();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('phone')->nullable()->index();
    $table->string('password');
    $table->string('locale')->default('en');
    $table->timestamp('last_login_at')->nullable();
    $table->rememberToken();
    $table->timestamps();
    $table->softDeletes();
});

Schema::create('leads', function (Blueprint $table) {
    $table->id();
    $table->foreignId('organization_id')->nullable()->constrained()->nullOnDelete();
    $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
    $table->enum('status', ['new','qualified','consultation_booked','customer','lost'])->default('new');
    $table->string('source')->default('web');
    $table->string('preferred_language')->default('en');
    $table->json('intake_json')->nullable();
    $table->timestamps();
    $table->softDeletes();
});

Schema::create('consultations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
    $table->timestamp('scheduled_at')->nullable()->index();
    $table->enum('status', ['pending','scheduled','completed','cancelled']);
    $table->foreignId('payment_id')->nullable()->constrained()->nullOnDelete();
    $table->timestamps();
});

Schema::create('payments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('consultation_id')->constrained()->cascadeOnDelete();
    $table->decimal('amount', 10, 2);
    $table->string('currency', 3)->default('AED');
    $table->enum('status', ['pending','succeeded','failed','refunded','disputed'])->default('pending');
    $table->string('gateway')->default('stripe');
    $table->string('stripe_payment_intent_id')->nullable()->unique();
    $table->string('receipt_url')->nullable();
    $table->json('metadata')->nullable();
    $table->timestamps();
});

Schema::create('jurisdictions', function (Blueprint $table) {
    $table->id();
    $table->string('code')->unique();
    $table->string('name_en');
    $table->string('name_ar');
    $table->enum('type', ['free_zone','mainland']);
    $table->string('emirate');
    $table->json('data');
    $table->timestamps();
});

Schema::create('recommendations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
    $table->json('input_json');
    $table->json('result_json');
    $table->unsignedTinyInteger('score');
    $table->foreignId('jurisdiction_id')->nullable()->constrained()->nullOnDelete();
    $table->timestamps();
});

Schema::create('whatsapp_sessions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('lead_id')->nullable()->constrained()->nullOnDelete();
    $table->string('wa_number');
    $table->enum('state', ['new','qualifying','awaiting_payment','post_payment','closed'])->default('new');
    $table->json('context_json')->nullable();
    $table->timestamps();
});
```

### 4.3 Eloquent Model Outlines
```php
class Lead extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = [
        'intake_json' => 'array',
    ];

    public function consultations() { return $this->hasMany(Consultation::class); }
    public function recommendations() { return $this->hasMany(Recommendation::class); }
}

class Jurisdiction extends Model
{
    use HasFactory;

    protected $casts = [
        'data' => 'array',
    ];

    public function scopeFreeZone($query) { return $query->where('type', 'free_zone'); }
}

class Payment extends Model
{
    use HasFactory;

    protected $casts = [
        'metadata' => 'array',
    ];

    public function consultation() { return $this->belongsTo(Consultation::class); }
}
```

---

## 5. API & Webhooks

### 5.1 Auth Strategy
- Use Laravel Sanctum (SPA + API tokens) for minimal overhead and first-party clients. Sanctum personal access tokens for Ops tools. Rate limiting via `RateLimiter::for('api')`.

### 5.2 Endpoint Catalog (all `/api/v1`)
| Method | Endpoint | Description | Validation |
| --- | --- | --- | --- |
| POST | /leads | Create lead | `name:required|string|max:120`, `email:required|email`, `phone:required|string`, `preferred_language:in:en,ar`, `source:nullable|string` |
| GET | /leads/{id} | Show lead (Ops/Admin) | Auth + policy |
| POST | /intake | Capture wizard inputs | `lead_id:required|exists:leads,id`, `business_activity:required|string`, `target_emirate:required|string|in:Dubai,Abu Dhabi,Sharjah,Ajman,Ras Al Khaimah,Fujairah,Umm Al Quwain`, `monthly_budget:required|numeric|min:1000`, `desired_visa_count:required|integer|min:0|max:20`, `urgency_days:required|integer|min:1|max:180` |
| GET | /recommendations | Retrieve top recommendations | Query: `lead_id|required|exists` |
| POST | /comparisons | Persist selected jurisdiction | `lead_id|required|exists`, `jurisdiction_id|required|exists:jurisdictions,id`, `notes:nullable|string` |
| POST | /checkout | Create payment session | `lead_id|required|exists`, `success_url:required|url`, `cancel_url:required|url` |
| POST | /webhooks/payments | Stripe webhook | Signature header `Stripe-Signature` |
| POST | /webhooks/whatsapp | WhatsApp inbound messages | Validate HMAC header |
| POST | /webhooks/vapi | Vapi call events | Validate signature, idempotency |
| POST | /google/reviews/sources | Register review source | `organization_id|required|exists`, `place_id:required|string`, `label:nullable|string|max:120` |
| POST | /reviews/ingest | Manual trigger for ingestion | `source_id|required|exists` |
| POST | /documents | Upload doc | Multipart `file|required|mimes:pdf,jpg,png|max:5120`, `lead_id|required|exists`, `type:required|in:passport,utility_bill,photo` |
| POST | /payments/{payment}/refund | Initiate refund | `reason:nullable|string|max:255` |
| GET | /metrics/health | Health check | n/a |

### 5.3 Example Requests/Responses
```http
POST /api/v1/leads
{
  "name": "Sara Ali",
  "email": "sara@example.com",
  "phone": "+971501234567",
  "preferred_language": "ar",
  "source": "landing_page"
}
→ 201 Created
{
  "data": {
    "id": 42,
    "status": "new"
  }
}
```

```http
POST /api/v1/checkout
{
  "lead_id": 42,
  "success_url": "https://app.example.com/checkout/success",
  "cancel_url": "https://app.example.com/checkout/cancel"
}
→ 200 OK
{
  "checkout_url": "https://checkout.stripe.com/pay/cs_test_a1B2..."
}
```

### 5.4 Webhook Signature Validation & Idempotency
- Stripe: use `Webhook::constructEvent($payload, $signature, config('services.stripe.webhook_secret'))`.
- WhatsApp: verify `X-Hub-Signature-256` using app secret.
- Vapi: verify `X-Vapi-Signature` with HMAC-SHA256 shared secret.
- Store webhook payload hash in `webhooks` table; if exists, skip processing (idempotent).

---

## 6. Integrations — Implementation Notes

### 6.1 Vapi
- Call flows:
  - **Qualification IVR**: Greeting → language choice → collect DTMF for business type → push data via webhook.
  - **Missed-call callback**: Detect missed call → auto schedule follow-up call via Vapi API.
  - **Post-payment call**: After payment, schedule Ops callback with lead data.
- Consent script: "This call may be recorded to improve our services. Press 1 to consent." Store response.
- Webhook payload example:
```json
{
  "call_id": "call_123",
  "status": "completed",
  "duration": 320,
  "recording_url": "https://vapi.example/recordings/call_123.mp3",
  "metadata": {"lead_id": 42}
}
```
- `ProcessVapiWebhookJob` updates `vapi_calls`, stores `call_records`, dispatches summary generation via OpenAI.

### 6.2 WhatsApp + OpenAI
- BSP: 360dialog – configure webhook URL, approved message templates (EN/AR).
- Template example: `consultation_payment` with variables for name, amount, payment link.
- Opt-in tracking stored in `consents` table (type `whatsapp_marketing`).
- Conversation state machine:
  1. `lead_qualification`: ask required questions, collect data.
  2. `payment_prompt`: send payment link; if no payment after 24h, send reminder.
  3. `post_payment_docs`: share checklist, gather uploads via secure link.
- OpenAI system prompt (see §13G).

### 6.3 Google Reviews
- `google_review_sources` table stores `place_id` + API key references.
- Cron `reviews:sync` (every 6h) fetches latest reviews with `newest` sort.
- Cache responses in Redis keyed by `place_id:etag`. Deduplicate via review `review_id`.
- Profanity filter using `wdalrymple/laravel-profanity-filter` or custom list; mask words before display.
- Only show reviews with explicit customer consent toggle.

### 6.4 Payments (Stripe)
- Checkout session with `line_items` amount 200 AED + VAT (if TRN present). Use `mode: payment`.
- Webhook `payment_intent.succeeded` updates payment status, generates invoice using Stripe API or custom PDF (e.g., DOMPDF) with VAT fields.
- Refund API via Stripe `Refund::create` with metadata referencing consultation.
- Apple Pay/Google Pay enabled via Stripe Payment Request Button (future).

---

## 7. Laravel Implementation Plan

1. `composer create-project laravel/laravel uae-setup --prefer-dist` (Laravel 11, PHP 8.3).
2. Add Docker artifacts:
   - `Dockerfile` with PHP-FPM 8.3, Node 20, Composer.
   - `docker-compose.yml` running app, MySQL 8, Redis, Horizon worker, mailhog.
3. Composer packages:
   - `spatie/laravel-permission` (roles/permissions)
   - `laravel/sanctum`
  - `laravel/cashier-stripe`
  - `spatie/laravel-activitylog` (audit)
  - `spatie/laravel-translatable` (optional for jurisdiction names)
  - `barryvdh/laravel-dompdf` (invoices)
  - `laravel/horizon`, `laravel/telescope` (non-prod)
  - `pestphp/pest --dev`
  - `laravel/pint --dev`
4. `.env` template snippet:
```
APP_NAME="UAE Business Setup"
APP_ENV=local
APP_URL=https://uae-setup.test
APP_LOCALE=en
FALLBACK_LOCALE=en
APP_TIMEZONE=Asia/Dubai
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=uae_setup
DB_USERNAME=root
DB_PASSWORD=secret
REDIS_HOST=redis
QUEUE_CONNECTION=redis
SANCTUM_STATEFUL_DOMAINS=localhost,uae-setup.test
STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
WHATSAPP_VERIFY_TOKEN=...
WHATSAPP_APP_SECRET=...
VAPI_API_KEY=...
VAPI_WEBHOOK_SECRET=...
OPENAI_API_KEY=...
GOOGLE_PLACES_KEY=...
S3_BUCKET=uae-setup
S3_REGION=me-central-1
MAIL_MAILER=mailgun
```
5. Queue config: use Redis; set `retry_after` 90s, `failed_jobs` table with retry command `queue:retry --once`.
6. Horizon dashboard secured behind Admin role; `horizon.php` config with `environments` for local/prod.
7. Localization: `lang/en` and `lang/ar` JSON files; middleware `SetLocale` reading from user preference or query. Tailwind plugin `postcss-rtl` or `tailwindcss-rtl` for RTL support.
8. Feature flags: use `feature_flags` table with toggles (e.g., `whatsapp_auto_nudge`).
9. Seeders: `JurisdictionSeeder`, `RolePermissionSeeder`, `DemoLeadSeeder`.

---

## 8. Security, Privacy, Compliance

- Threat model addresses OWASP Top 10: input validation, prepared statements, escaping in Blade, CSRF tokens, rate limiting login, password hashing (Argon2id), 2FA optional.
- CSP headers via `spatie/laravel-csp` (default allow self, Stripe, WhatsApp domains).
- OAuth2 optional; primary auth via sessions + Sanctum tokens.
- Access Control Matrix:
  - Guests: create leads only.
  - Leads: view/edit own profile, recommendations, payments, documents.
  - Customers: all lead permissions + view invoices, reviews.
  - Ops Agents: manage leads/customers, approvals, schedule calls.
  - Admin: manage system settings, feature flags, jurisdictions, audit logs.
- Data retention: leads inactive >24 months anonymized; documents deleted 90 days post case closure unless regulatory requirement.
- PII classification: Tier 1 (name, passport) encrypted at rest via MySQL TDE; S3 with KMS-managed keys.
- TLS enforced (HSTS). Secrets stored in AWS Parameter Store with IAM.
- Consent management: record `consents` for marketing, WhatsApp, call recording; provide "withdraw consent" button.
- Audit logs: capture actor, action, before/after, IP. Provide export + "Delete my data" process within 30 days.

---

## 9. Observability & SRE

- Logging: JSON structured using Monolog; include `request_id` (via middleware), `user_id`, `locale`, `duration_ms`.
- Health endpoints: `/api/v1/metrics/health` returns DB + Redis ping results.
- Metrics: use Laravel Prometheus client – counters for leads created, payments succeeded/failed, WhatsApp SLA, call completion rate, review sync success. Histograms for response times.
- Alerting: PagerDuty triggered when error rate >5% or payment success rate <90% for 15 minutes.
- Runbook: On-call steps – check Horizon queue depth, inspect logs, verify third-party status, escalate to BSP if WhatsApp downtime.

---

## 10. Testing & QA

- Unit tests (Pest) for scoring engine, payment service, webhook handlers.
- Feature tests for lead onboarding, payment flow, document upload.
- Contract tests: store webhook fixtures for Stripe, Vapi, WhatsApp; use `Http::fake()` to replay.
- Load test via k6 or Artillery for lead form (100 RPS) and webhook endpoints (burst 50 RPS).
- UAT checklist per epic: Onboarding wizard translation, payment receipt accuracy, WhatsApp conversation, Vapi call scheduling, review ingestion, accessibility (keyboard navigation, contrast).

---

## 11. Deployment & DevOps

- CI/CD using GitHub Actions: steps = install deps, `composer test`, `npm ci && npm run build`, `php artisan test`, `php artisan pest`, `npm run lint`, run Pint, run Dusk (if added). Deploy via `ssh` or `Envoyer` to ECS/Kubernetes.
- Environments: `dev` (Docker), `stage` (UAT), `prod` (HA). Use blue/green for zero downtime; migrations run with `php artisan migrate --force` before switch.
- Secrets: GitHub OIDC to AWS Parameter Store; runtime via `aws ssm get-parameters`. Automated daily backups (RDS snapshots) + WAL shipping for PITR. RPO 15 min, RTO 2 hours.

---

## 12. Analytics & Growth

- Funnel instrumentation using Plausible + server events: `lead_viewed`, `lead_submitted`, `consultation_paid`, `call_completed`, `case_created`.
- Event naming: `entity.action` (e.g., `consultation.paid`). Include properties: currency, jurisdiction_code, marketing_source.
- Dashboard widgets: conversion by channel, top jurisdictions by score, payment success by gateway, average licensing timeline, NPS from reviews.

---

## 13. Concrete Outputs

### 13A. Product Brief (≤2 pages)
**Product Vision:** Deliver a bilingual digital concierge that simplifies UAE business setup through guided recommendations, automated communications, and secure payments.

**Target Users:** Entrepreneurs inside/outside UAE seeking to form a company; internal operations team managing cases.

**Value Propositions:**
- Instant guidance on free zone vs mainland options tailored to business activity.
- Seamless consultation booking with secure AED payments and VAT-compliant invoicing.
- Multichannel follow-up via WhatsApp and voice to reduce manual chasing.
- Visibility into customer reviews to build trust.

**Key Features:**
1. Lead capture with localized landing pages.
2. AI-assisted onboarding wizard with real-time comparisons.
3. 200 AED consultation checkout (Apple Pay/Google Pay via Stripe).
4. WhatsApp chatbot for qualification, document reminders, status updates.
5. Automated Vapi callback scheduling.
6. Document vault for KYC submissions.
7. Ops dashboard with queue management and audit logs.
8. Review aggregator from Google Business Profiles.

**Customer Journey:** Awareness → Lead form → Wizard recommendations → Payment → Consultation call → Proposal → Company formation support.

**Success Metrics:** Lead-to-paid conversion 25%, consultation-to-engagement 60%, average response time <10 min, customer NPS >55, refund rate <5%.

### 13B. Technical Architecture Spec (Highlights)
1. **Frontend:** Blade + Tailwind + Alpine for wizard; Vue 3 optional for comparison component. RTL supported by Tailwind plugin.
2. **Backend:** Laravel 11, PHP 8.3, MySQL 8; Octane optional for concurrency. Sanctum authentication.
3. **Queues:** Redis with Horizon. Jobs for scoring, payment confirmation, WhatsApp messaging, Vapi scheduling, review ingestion.
4. **Integrations:** Stripe (Cashier), 360dialog WhatsApp (custom SDK), Vapi REST, Google Places API, OpenAI Assistants.
5. **Storage:** S3 (me-central-1) with server-side encryption; signed URLs for documents.
6. **Security:** HSTS, CSP, signed cookies, rate limiting, 2FA, encryption at rest, hashed API keys.
7. **Observability:** Monolog JSON to CloudWatch, Prometheus metrics, Sentry for error tracking.
8. **Deployment:** Dockerized containers orchestrated via ECS Fargate; GitHub Actions pipeline with automated testing and blue/green deploy.
9. **Data Protection:** Consent logs, DSR workflows, deletion tasks, retention policy automation.

### 13C. Endpoint Catalog with Validation (Detailed)
```markdown
- POST /api/v1/leads
  - Validation: name:string|max:120, email:email, phone:string|min:6, preferred_language:in:en,ar, source:nullable|string|max:60.
  - Auth: Public with reCAPTCHA + rate limit 10/min per IP.

- GET /api/v1/leads/{lead}
  - Auth: Sanctum + `can:view,lead`.

- PATCH /api/v1/leads/{lead}
  - Validation: status:in:new,qualified,consultation_booked,customer,lost; notes:nullable|string.

- POST /api/v1/intake
  - See §5.2. Rate limit 20/min per lead.

- GET /api/v1/recommendations
  - Auth: Lead or Ops. Cache 5 minutes.

- POST /api/v1/comparisons
  - Validation: lead_id exists, jurisdiction_id exists, comparison_json optional array.

- POST /api/v1/checkout
  - Validation as above. Returns checkout URL + session ID stored in `payments.metadata`.

- POST /api/v1/payments/{payment}/refund
  - Auth: Ops/Admin; ensures payment.status in [succeeded].

- POST /api/v1/webhooks/payments
  - Validates Stripe signature, ensures idempotent by `stripe_payment_intent_id` unique.

- POST /api/v1/webhooks/whatsapp
  - Validates signature, stores message in `messages`, dispatches `HandleWhatsAppMessageJob`.

- POST /api/v1/webhooks/vapi
  - Validates signature, updates `vapi_calls`/`call_records`.

- POST /api/v1/google/reviews/sources
  - Validation as §5.2.

- POST /api/v1/reviews/ingest
  - Auth: Ops/Admin.

- POST /api/v1/documents
  - Uses Laravel MediaLibrary or S3 direct upload.

- GET /api/v1/reviews
  - Returns approved reviews filtered by lead/organization.

- GET /api/v1/settings
  - Admin only.

- POST /api/v1/consents
  - Validation: lead_id exists, consent_type in [marketing,whatsapp,calls,recording], granted:boolean.
```

### 13D. SQL Migration Snippets (Additional)
```php
Schema::create('reviews', function (Blueprint $table) {
    $table->id();
    $table->foreignId('source_id')->constrained('google_review_sources')->cascadeOnDelete();
    $table->string('external_id')->unique();
    $table->string('reviewer_name')->nullable();
    $table->unsignedTinyInteger('rating');
    $table->text('text')->nullable();
    $table->string('language', 5)->default('en');
    $table->timestamp('published_at');
    $table->enum('status', ['pending','approved','rejected'])->default('pending');
    $table->timestamps();
});

Schema::create('documents', function (Blueprint $table) {
    $table->id();
    $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
    $table->enum('type', ['passport','utility_bill','photo','other']);
    $table->string('path');
    $table->string('mime');
    $table->enum('status', ['submitted','approved','rejected'])->default('submitted');
    $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
    $table->timestamp('approved_at')->nullable();
    $table->timestamps();
});

Schema::create('consents', function (Blueprint $table) {
    $table->id();
    $table->foreignId('lead_id')->nullable()->constrained()->nullOnDelete();
    $table->enum('consent_type', ['marketing','whatsapp','calls','recording']);
    $table->timestamp('granted_at');
    $table->timestamp('revoked_at')->nullable();
    $table->string('source')->nullable();
    $table->timestamps();
});
```

### 13E. Example Laravel Controllers & FormRequests
```php
class LeadController extends Controller
{
    public function store(StoreLeadRequest $request)
    {
        $lead = DB::transaction(function () use ($request) {
            $lead = Lead::create($request->validated());
            AuditLog::record('lead.created', $lead);
            dispatch(new QualifyLeadJob($lead->id));
            return $lead;
        });

        return new LeadResource($lead);
    }
}

class StoreLeadRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required','string','max:120'],
            'email' => ['required','email','max:255','unique:leads,email'],
            'phone' => ['required','string','max:20'],
            'preferred_language' => ['nullable','in:en,ar'],
            'source' => ['nullable','string','max:60'],
        ];
    }
}

class CheckoutController extends Controller
{
    public function store(CheckoutRequest $request)
    {
        $lead = Lead::findOrFail($request->lead_id);
        $consultation = $lead->consultations()->firstOrCreate(['status' => 'pending']);

        $session = StripeService::createCheckoutSession($consultation, $request->success_url, $request->cancel_url);

        return response()->json([
            'checkout_url' => $session->url,
            'session_id' => $session->id,
        ]);
    }
}

class HandleStripeWebhookJob implements ShouldQueue
{
    public function __construct(protected array $payload) {}

    public function handle(): void
    {
        $event = $this->payload['type'] ?? null;
        $intent = data_get($this->payload, 'data.object');

        if ($event === 'payment_intent.succeeded') {
            $payment = Payment::where('stripe_payment_intent_id', $intent['id'])->first();
            if (! $payment || $payment->status === 'succeeded') {
                return; // idempotent
            }
            $payment->update([
                'status' => 'succeeded',
                'receipt_url' => $intent['charges']['data'][0]['receipt_url'] ?? null,
                'metadata' => $intent['metadata'] ?? [],
            ]);
            GenerateInvoiceJob::dispatch($payment->id);
            SendWhatsAppTemplateJob::dispatch($payment->consultation->lead_id, 'consultation_paid');
            ScheduleVapiCallbackJob::dispatch($payment->consultation->lead_id);
        }
    }
}
```

### 13F. Webhook Handlers with Signature Checks
```php
class StripeWebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        $signature = $request->header('Stripe-Signature');
        $payload = $request->getContent();

        $event = Webhook::fromStripe($payload, $signature);
        if (Webhook::alreadyProcessed($event->id)) {
            return response()->json(['status' => 'ignored']);
        }

        ProcessStripeWebhook::dispatch($event->toArray());
        return response()->json(['status' => 'accepted']);
    }
}

class WhatsAppWebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        verifyWhatsAppSignature($request);
        $payload = $request->input();
        if (Webhook::alreadyProcessed(data_get($payload, 'entry.0.id'))) {
            return response()->json(['status' => 'ignored']);
        }
        ProcessWhatsAppWebhook::dispatch($payload);
        return response()->json(['status' => 'accepted']);
    }

    protected function verifyWhatsAppSignature(Request $request): void
    {
        $expected = 'sha256=' . hash_hmac('sha256', $request->getContent(), config('services.whatsapp.app_secret'));
        if (! hash_equals($expected, $request->header('X-Hub-Signature-256'))) {
            abort(401, 'Invalid signature');
        }
    }
}

class VapiWebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        $signature = $request->header('X-Vapi-Signature');
        $expected = hash_hmac('sha256', $request->getContent(), config('services.vapi.webhook_secret'));
        abort_unless(hash_equals($expected, $signature), 401);

        ProcessVapiWebhook::dispatch($request->all());
        return response()->json(['status' => 'accepted']);
    }
}
```

### 13G. WhatsApp Assistant System Prompt
```
You are "BizSetup Guide", a bilingual assistant helping entrepreneurs form companies in the UAE.
- Languages: reply in Arabic if the user starts in Arabic; otherwise English.
- Tone: professional, encouraging, concise.
- Collect: business activity, target emirate, budget range, desired visas, timeline.
- When payment is due, send the templated payment message using {{payment_link}}.
- After payment confirmation, share the document checklist and remind about call schedule.
- Never provide legal guarantees or final pricing. Add disclaimer: "Final confirmation provided by our licensed consultants." when discussing costs.
- If user requests human agent, escalate: "I'll connect you with a consultant now" and tag conversation `needs_agent`.
- Refuse: do not answer unrelated topics (politics, unrelated personal requests). Say "I'm here to help with UAE business setup matters only.".
- If user shares PII (passport numbers), acknowledge receipt but advise they should upload via secure portal link.
- Log key answers in JSON context (activity, emirate, budget, visas, timeline) for CRM via webhook.
- End each conversation with CTA: "Would you like to schedule your consultation call?" unless already scheduled.
```

### 13H. Seeder Outline
```php
class JurisdictionSeeder extends Seeder
{
    public function run(): void
    {
        $data = collect([
            ['code' => 'IFZA', 'name_en' => 'IFZA Dubai', 'name_ar' => 'منطقة إفزا', 'type' => 'free_zone', 'emirate' => 'Dubai', 'data' => [
                'setup_fee_aed' => 12500,
                'renewal_fee_aed' => 11500,
                'visa_quota' => 3,
                'processing_days' => 7,
                'allowed_activities' => ['consulting','trading','tech'],
                'foreign_ownership' => 100,
            ]],
            ['code' => 'DMCC', 'name_en' => 'DMCC', 'name_ar' => 'مركز دبي للسلع المتعددة', 'type' => 'free_zone', 'emirate' => 'Dubai', 'data' => [
                'setup_fee_aed' => 20000,
                'renewal_fee_aed' => 19000,
                'visa_quota' => 6,
                'processing_days' => 10,
                'allowed_activities' => ['commodities','finance','tech'],
            ]],
            // ... other jurisdictions ...
        ]);

        $data->each(fn ($item) => Jurisdiction::updateOrCreate(['code' => $item['code']], $item));
    }
}
```

### 13I. 30/60/90 Day Roadmap
| Timeline | Milestones | Risks | Mitigations |
| --- | --- | --- | --- |
| Day 0–30 | Set up Laravel project, Docker, auth, role seeding, lead intake form, basic wizard UI, initial jurisdictions seeding | Delays in design assets | Use Tailwind UI placeholders |
| Day 31–60 | Integrate Stripe checkout, WhatsApp BSP sandbox, scoring engine, comparison UI, multilingual content, Horizon | BSP approval lag | Start BSP registration immediately; fallback to SMS |
| Day 61–90 | Vapi automation, review ingestion, document vault, observability stack, compliance workflows, UAT + production hardening | Regulatory changes | Maintain ops watchlist; build feature flag for pricing updates |

---

## Next Decisions for Stakeholders
1. Confirm payment gateway (Stripe vs local UAE provider) and VAT handling rules.
2. Approve WhatsApp BSP onboarding plan and phone number acquisition.
3. Validate initial jurisdiction dataset and priority industries.
4. Finalize branding assets and copy sign-off.
5. Decide on multitenancy roadmap (agency reseller support) post-MVP.
