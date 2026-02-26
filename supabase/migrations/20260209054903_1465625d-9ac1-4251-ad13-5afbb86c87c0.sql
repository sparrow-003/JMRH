-- Add content length constraint for reviews using a validation trigger
CREATE OR REPLACE FUNCTION public.validate_review_content()
RETURNS TRIGGER AS $$
BEGIN
    IF char_length(NEW.content) < 10 THEN
        RAISE EXCEPTION 'Review content must be at least 10 characters';
    END IF;
    IF char_length(NEW.content) > 2000 THEN
        RAISE EXCEPTION 'Review content must be under 2000 characters';
    END IF;
    IF NEW.rating < 1 OR NEW.rating > 5 THEN
        RAISE EXCEPTION 'Rating must be between 1 and 5';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_review_before_insert_update
    BEFORE INSERT OR UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_review_content();

-- Create storage bucket for paper attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('papers', 'papers', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for papers bucket
CREATE POLICY "Authors can upload paper attachments"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'papers' AND
    auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Authors can view own paper attachments"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'papers' AND (
        auth.uid()::text = (storage.foldername(name))[1] OR
        has_role(auth.uid(), 'admin') OR
        has_role(auth.uid(), 'professor')
    )
);

CREATE POLICY "Authors can delete own paper attachments"
ON storage.objects FOR DELETE TO authenticated
USING (
    bucket_id = 'papers' AND
    auth.uid()::text = (storage.foldername(name))[1]
);