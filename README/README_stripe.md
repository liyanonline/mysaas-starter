To download and install the Stripe CLI (v1.27.0) on **Google Cloud Platform (GCP)**—such as a **Cloud Shell** or **Compute Engine VM running Linux**—you can follow these steps:

---

### ✅ GCP: Install Stripe CLI v1.27.0 (Linux x86\_64)

```bash
# Step 1: Download the archive
curl -L https://github.com/stripe/stripe-cli/releases/download/v1.27.0/stripe_1.27.0_linux_x86_64.tar.gz -o stripe.tar.gz

# Step 2: Extract it
tar -xvzf stripe.tar.gz

# Step 3: Move the binary to a system path (e.g., /usr/local/bin)
sudo mv stripe /usr/local/bin/

# Step 4: Verify the installation
stripe version
```

---

### 🧼 Optional: Clean up

```bash
rm stripe.tar.gz
```

---

Let me know if you're running this in a specific environment (like GCP Cloud Shell, a Docker container, or a VM), and I can adjust the instructions accordingly.
