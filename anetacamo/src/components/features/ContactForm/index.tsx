import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "../../../CartContext";
import { submitForm } from "../../../api";
import { useTranslation } from "../../../LangContext";
import Button from "../../ui/Button";
import CartSummary from "../CartSummary";
import styles from "./ContactForm.module.scss";

interface ContactFormProps {
  type: string;
  messageText?: string;
}

export default function ContactForm({ type, messageText }: ContactFormProps) {
  const { items, clearCart } = useCart();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await submitForm({
        name: data.name as string,
        email: data.email as string,
        message: data.message as string,
        type,
        cartItems: items,
      });
      setSuccess(true);
      formRef.current?.reset();
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    } catch {
      setError(t("submissionFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={styles.contactForm}>
        <p className={styles.successMessage} role="status">
          {t("messageSentSuccess")}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
      {error && <p className={styles.errorMessage} role="alert">{error}</p>}
      <div className={styles.inputGroup}>
        <label htmlFor="name" className="sr-only">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
          className="large"
        />
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="large"
          placeholder="Mail to contact you"
        />
      </div>
      <CartSummary items={items} type={type} />
      <div className={styles.inputGroup}>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          className="large"
          placeholder={messageText || "Your message"}
        />
      </div>
      <div className={`${styles.inputGroup} ${styles.center}`}>
        <Button type="submit" disabled={submitting}>
          {submitting ? t("sending") : t("sendMessage")}
        </Button>
      </div>
    </form>
  );
}
