CREATE TABLE public.athlete_coach_history (
  id serial NOT NULL,
  athlete_id uuid NOT NULL,
  coach_id uuid NOT NULL,
  start_date date NOT NULL,
  end_date date NULL,
  CONSTRAINT athlete_coach_history_pkey PRIMARY KEY (id),
  CONSTRAINT athlete_coach_history_athlete_id_fkey FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE,
  CONSTRAINT athlete_coach_history_coach_id_fkey FOREIGN KEY (coach_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE public.athlete_guardians (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  athlete_id uuid NOT NULL,
  guardian_id uuid NOT NULL,
  relationship text NULL,
  created_at timestamp without time zone NULL DEFAULT now(),
  CONSTRAINT athlete_guardians_pkey PRIMARY KEY (id),
  CONSTRAINT athlete_guardians_athlete_id_fkey FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE,
  CONSTRAINT athlete_guardians_guardian_id_fkey FOREIGN KEY (guardian_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT athlete_guardians_relationship_check CHECK ((relationship = ANY (ARRAY['father'::text, 'mother'::text, 'guardian'::text])))
);

CREATE TABLE public.athlete_health_history (
  id serial NOT NULL,
  athlete_id uuid NOT NULL,
  record_date timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  height numeric(5,2) NULL,
  weight numeric(5,2) NULL,
  vo2max numeric(5,2) NULL,
  max_heart_rate numeric(5,2) NULL,
  avg_heart_rate numeric(5,2) NULL,
  hrv numeric(5,2) NULL,
  sleep_quality character varying(50) NULL,
  CONSTRAINT athlete_health_history_pkey PRIMARY KEY (id),
  CONSTRAINT athlete_health_history_athlete_id_fkey FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);

CREATE TABLE public.athlete_health_metrics (
  id serial NOT NULL,
  athlete_id uuid NOT NULL,
  record_date timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  height numeric(5,2) NULL,
  weight numeric(5,2) NULL,
  vo2max numeric(5,2) NULL,
  max_heart_rate numeric(5,2) NULL,
  avg_heart_rate numeric(5,2) NULL,
  hrv numeric(5,2) NULL,
  sleep_quality character varying(50) NULL,
  CONSTRAINT athlete_health_metrics_pkey PRIMARY KEY (id),
  CONSTRAINT athlete_health_metrics_athlete_id_fkey FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);

CREATE TABLE public.athlete_performance_history (
  id serial NOT NULL,
  athlete_id uuid NOT NULL,
  record_date timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  event_name character varying(50) NOT NULL,
  result_time numeric(6,3) NULL,
  power numeric(6,2) NULL,
  CONSTRAINT athlete_performance_history_pkey PRIMARY KEY (id),
  CONSTRAINT athlete_performance_history_athlete_id_fkey FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);

CREATE TABLE public.athlete_performance_metrics (
  id serial NOT NULL,
  athlete_id uuid NOT NULL,
  record_date timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  event_name character varying(50) NOT NULL,
  result_time numeric(6,3) NULL,
  power numeric(6,2) NULL,
  CONSTRAINT athlete_performance_metrics_pkey PRIMARY KEY (id),
  CONSTRAINT athlete_performance_metrics_athlete_id_fkey FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);

CREATE TABLE public.athlete_team_history (
  id serial NOT NULL,
  athlete_id uuid NOT NULL,
  team_id integer NOT NULL,
  start_date date NOT NULL,
  end_date date NULL,
  CONSTRAINT athlete_team_history_pkey PRIMARY KEY (id),
  CONSTRAINT athlete_team_history_athlete_id_fkey FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE,
  CONSTRAINT athlete_team_history_team_id_fkey FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE public.athletes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  first_name character varying(50) NOT NULL,
  last_name character varying(50) NOT NULL,
  birth_date date NOT NULL,
  gender character(1) NULL,
  category character varying(20) NULL,
  specialization character varying(50) NULL,
  team_id integer NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  is_minor boolean NOT NULL DEFAULT true,
  CONSTRAINT athletes_pkey PRIMARY KEY (id),
  CONSTRAINT athletes_team_id_fkey FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
  CONSTRAINT athletes_gender_check CHECK ((gender = ANY (ARRAY['M'::bpchar, 'F'::bpchar])))
);

CREATE TABLE public.conversation_members (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  conversation_id uuid NULL,
  user_id uuid NULL,
  role text NULL,
  CONSTRAINT conversation_members_pkey PRIMARY KEY (id),
  CONSTRAINT conversation_members_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  CONSTRAINT conversation_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT conversation_members_role_check CHECK ((role = ANY (ARRAY['athlete'::text, 'coach'::text, 'manager'::text, 'guardian'::text])))
);

CREATE TABLE public.conversations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NULL,
  created_at timestamp without time zone NULL DEFAULT now(),
  CONSTRAINT conversations_pkey PRIMARY KEY (id)
);

CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  conversation_id uuid NULL,
  sender_id uuid NULL,
  message text NULL,
  sent_at timestamp without time zone NULL DEFAULT now(),
  is_read boolean NULL DEFAULT false,
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE public.teams (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT teams_pkey PRIMARY KEY (id),
  CONSTRAINT teams_name_key UNIQUE (name)
);

CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  name text NOT NULL,
  surname text NOT NULL,
  email text NOT NULL,
  phone text NULL,
  country text NOT NULL,
  team text NOT NULL,
  sector text NOT NULL,
  role text NOT NULL,
  "dateOfBirth" date NOT NULL,
  "parentName" text NULL,
  "parentSurname" text NULL,
  "parentPhone" text NULL,
  "parentEmail" text NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  password text NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_email_key UNIQUE (email)
);