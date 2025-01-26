ALTER POLICY "read_conversations" ON conversations
    FOR SELECT TO authenticated
    USING (auth.uid() IN (SELECT conversation_members.user_id FROM conversation_members WHERE (conversation_members.conversation_id = conversations.id)));

ALTER POLICY "Authenticated users can view their own profiles" ON users
    FOR SELECT TO authenticated
    USING (id = auth.uid());

ALTER POLICY "Authenticated users can create their own profiles" ON users
    FOR INSERT TO authenticated
    WITH CHECK (true);

ALTER POLICY "Authenticated users can update their own records" ON users
    FOR UPDATE TO authenticated
    USING (id = auth.uid());

ALTER POLICY "Authenticated users can delete their own records" ON users
    FOR DELETE TO authenticated
    USING (id = auth.uid());

ALTER POLICY "Authenticated users can read their own data" ON users
    FOR SELECT TO authenticated
    USING (email = auth.email());

ALTER POLICY "athlete_read_own_data" ON athletes
    FOR SELECT TO authenticated
    USING ((auth.uid() = id) OR (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athletes.id) AND (athlete_coach_history.end_date IS NULL)))) OR (auth.uid() IN (SELECT users.id FROM users WHERE ('manager' = ANY (users.role)))));

ALTER POLICY "coach_update_athlete_data" ON athletes
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athletes.id) AND (athlete_coach_history.end_date IS NULL))));

ALTER POLICY "manager_update_contact_info" ON users
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT users.id FROM users WHERE ('manager' = ANY (users.role))));

ALTER POLICY "read_own_health_metrics" ON athlete_health_metrics
    FOR SELECT TO authenticated
    USING ((auth.uid() = athlete_id) OR (auth.uid() IN (SELECT athlete_guardians.guardian_id FROM athlete_guardians WHERE (athlete_guardians.athlete_id = athlete_health_metrics.athlete_id))) OR (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athlete_health_metrics.athlete_id) AND (athlete_coach_history.end_date IS NULL)))));

ALTER POLICY "write_health_metrics_insert" ON athlete_health_metrics
    FOR INSERT TO authenticated
    WITH CHECK (((auth.uid() = athlete_id) AND ((SELECT EXTRACT(year FROM age((athletes.birth_date)::timestamp with time zone)) AS "extract" FROM athletes WHERE (athletes.id = athlete_health_metrics.athlete_id)) >= (18)::numeric)) OR (auth.uid() IN (SELECT athlete_guardians.guardian_id FROM athlete_guardians WHERE (athlete_guardians.athlete_id = athlete_health_metrics.athlete_id))));

ALTER POLICY "write_health_metrics_update" ON athlete_health_metrics
    FOR UPDATE TO authenticated
    WITH CHECK (((auth.uid() = athlete_id) AND ((SELECT EXTRACT(year FROM age((athletes.birth_date)::timestamp with time zone)) AS "extract" FROM athletes WHERE (athletes.id = athlete_health_metrics.athlete_id)) < (18)::numeric)) OR (auth.uid() IN (SELECT athlete_guardians.guardian_id FROM athlete_guardians WHERE (athlete_guardians.athlete_id = athlete_health_metrics.athlete_id))));

ALTER POLICY "read_performance_metrics" ON athlete_performance_metrics
    FOR SELECT TO authenticated
    USING ((auth.uid() = athlete_id) OR (auth.uid() IN (SELECT athlete_guardians.guardian_id FROM athlete_guardians WHERE (athlete_guardians.athlete_id = athlete_performance_metrics.athlete_id))) OR (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athlete_performance_metrics.athlete_id) AND (athlete_coach_history.end_date IS NULL)))));

ALTER POLICY "write_performance_metrics" ON athlete_performance_metrics
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athlete_performance_metrics.athlete_id) AND (athlete_coach_history.end_date IS NULL))));

ALTER POLICY "insert_health_history" ON athlete_health_history
    FOR INSERT TO authenticated
    WITH CHECK ((auth.uid() = athlete_id) OR (auth.uid() IN (SELECT athlete_guardians.guardian_id FROM athlete_guardians WHERE (athlete_guardians.athlete_id = athlete_health_history.athlete_id))));

ALTER POLICY "read_health_history" ON athlete_health_history
    FOR SELECT TO authenticated
    USING ((auth.uid() = athlete_id) OR (auth.uid() IN (SELECT athlete_guardians.guardian_id FROM athlete_guardians WHERE (athlete_guardians.athlete_id = athlete_health_history.athlete_id))) OR (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athlete_health_history.athlete_id) AND (athlete_coach_history.end_date IS NULL)))));

ALTER POLICY "read_performance_history" ON athlete_performance_history
    FOR SELECT TO authenticated
    USING ((auth.uid() = athlete_id) OR (auth.uid() IN (SELECT athlete_guardians.guardian_id FROM athlete_guardians WHERE (athlete_guardians.athlete_id = athlete_performance_history.athlete_id))) OR (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athlete_performance_history.athlete_id) AND (athlete_coach_history.end_date IS NULL)))));

ALTER POLICY "write_performance_history_insert" ON athlete_performance_history
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athlete_performance_history.athlete_id) AND (athlete_coach_history.end_date IS NULL))));

ALTER POLICY "write_performance_history_update" ON athlete_performance_history
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athlete_performance_history.athlete_id) AND (athlete_coach_history.end_date IS NULL))));

ALTER POLICY "read_team_history" ON athlete_team_history
    FOR SELECT TO authenticated
    USING ((auth.uid() = athlete_id) OR (auth.uid() IN (SELECT athlete_coach_history.coach_id FROM athlete_coach_history WHERE ((athlete_coach_history.athlete_id = athlete_team_history.athlete_id) AND (athlete_coach_history.end_date IS NULL)))) OR (auth.uid() IN (SELECT users.id FROM users WHERE ('manager' = ANY (users.role)))));

ALTER POLICY "write_team_history_insert" ON athlete_team_history
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() IN (SELECT users.id FROM users WHERE ('manager' = ANY (users.role))));

ALTER POLICY "write_team_history_update" ON athlete_team_history
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT users.id FROM users WHERE ('manager' = ANY (users.role))));

ALTER POLICY "read_coach_history" ON athlete_coach_history
    FOR SELECT TO authenticated
    USING ((auth.uid() = athlete_id) OR (auth.uid() IN (SELECT athlete_coach_history_1.coach_id FROM athlete_coach_history athlete_coach_history_1 WHERE ((athlete_coach_history_1.athlete_id = athlete_coach_history_1.athlete_id) AND (athlete_coach_history_1.end_date IS NULL)))) OR (auth.uid() IN (SELECT users.id FROM users WHERE ('manager' = ANY (users.role)))));