import React, { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RtrkpCgjzdQoAkZEXHoO1NiY9wXDzXNfgiO7xQfvzt0GlgHcYDb6u3n14yN6fobYvFOatHs8Q2EtLZPjseb5nfM00L3MRZD9u"
);

interface StripeWrapperProps {
  children: ReactNode;
  options?: any;
}

export const StripeWrapper: React.FC<StripeWrapperProps> = ({
  children,
  options,
}) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
