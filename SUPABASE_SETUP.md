# Setup Supabase pentru Victor Tigoianu Pro

## Pasul 1: Creează un proiect Supabase

1. Mergi pe [supabase.com](https://supabase.com) și creează un cont nou
2. Creează un proiect nou numit "victor-tigoianu-pro"
3. Așteaptă ca proiectul să fie pregătit

## Pasul 2: Configurează baza de date

1. În dashboard-ul Supabase, mergi la **SQL Editor**
2. Copiază tot conținutul din fișierul [`supabase/schema.sql`](supabase/schema.sql)
3. Executează scriptul SQL în editor
4. Verifică că toate tabelele au fost create în secțiunea **Table Editor**

## Pasul 3: Obține credențialele

1. Mergi la **Project Settings** → **API**
2. Copiază:
   - **Project URL** - înlocuiește `YOUR_SUPABASE_PROJECT_URL` în `src/environments/environment.ts`
   - **anon public** key - înlocuiește `YOUR_SUPABASE_ANON_KEY` în `src/environments/environment.ts`

## Pasul 4: Actualizează configurația

Editează fișierul `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'https://TAU-PROJECT-ID.supabase.co',
    anonKey: 'TAU-ANON-KEY-AICI'
  }
};
```

## Tabelele create

| Tabel | Descriere |
|-------|------------|
| `workers` | Informații despre muncitori |
| `sites` | Șantierele active |
| `vehicles` | Flota de vehicule |
| `work_sessions` | Sesiunile de lucru |
| `location_tracking` | Locațiile GPS în timp real |
| `work_logs` | Jurnalul de ore lucrate |
| `fuel_logs` | Consum combustibil |
| `material_logs` | Materiale folosite |
| `notices` | Avizier / anunțuri |
| `material_options` | Opțiuni materiale |

## Funcționalități implementate

### 1. Urmărire locație live
- Serviciu GPS continuu pentru muncitori
- Actualizare locație la fiecare 30 secunde
- Salvare în baza de date Supabase

### 2. Hartă interactivă
- Accesibilă din meniul admin: **Hartă**
- Afișare muncitori activi pe hartă
- Marcatori personalizați cu status (Activ/Pauză)
- Click pe marker pentru detalii

### 3. Sincronizare date
- `StateService` - gestionează starea locală
- `SupabaseService` - conexiune și operații CRUD
- `LocationTrackingService` - urmărire GPS
- Sincronizare automată la fiecare 5 minute

### 4. Date în timp real (Realtime)
- Subscribe la actualizări locații
- Subscribe la schimbări sesiuni
- Subscribe la modificări muncitori

## Rute noi

- `/admin/map` - Hartă live cu locațiile muncitorilor

## Note

- Aplicația funcționează și fără Supabase (mod offline cu date locale)
- Pentru producție, adaugă autentificare și politici RLS mai restrictive
- Setează intervalul de sync în funcție de nevoi (implicit 5 minute)
