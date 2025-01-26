ALTER TABLE users
  ALTER COLUMN role SET DATA TYPE text[] USING string_to_array(role, ',');
