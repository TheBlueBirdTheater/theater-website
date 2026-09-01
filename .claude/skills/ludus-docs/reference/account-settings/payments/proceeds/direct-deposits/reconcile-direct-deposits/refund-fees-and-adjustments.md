---
title: "Refund Fees and Adjustments"
source_url: "https://support.ludus.com/refund-fees-and-adjustments"
category: "Account Settings > Payments > Proceeds > Direct Deposits > Reconcile direct deposits"
scraped_at: "2026-09-01T19:01:51.944Z"
---

# Refund Fees and Adjustments

When reconciling a direct deposit payout, you may know two categories: **Refund Fees (Returned)** and **Adjustments**. These appear when you absorb fees on events and end up refunding tickets or doing ticket downgrades. Here is an explanation of both:

### **Refund Fees (Returned)**

When you refund a ticket that has fees absorbed, we refund the full face value of the ticket back to the patron which includes the absorbed fee. For example, patron pays $10 flat, we take the $1.25 fee, and send you the $8.75 to your Stripe account. If you end up refunding the $10 to the patron, we need to take $10 from your Stripe account, though we originally only sent you $8.75. What we do to get the full fee back is charge your Stripe account $1.25, evening out to a total negative value of $10 on your account (the original face value of the ticket). If you pass fees on to patrons, then this does not occur.

### Adjustments

Stripe's minimum charge amount is $0.50, which means we can not charge your account for anything less than $0.50. Sometimes when you do a downgrade — like from $10 to $9— the returned refund fee may be less than $0.50, in this case let's say $0.19. What we have to do is charge your account $0.50 first, and then we return the $0.31 difference so you never return more fees than expected. This happens in one fell swoop so your transaction log will show a "Refund Fees (Returned)" line as $0.50 and then an Adjustment of $0.31, so your net returned fee is -$0.19.
