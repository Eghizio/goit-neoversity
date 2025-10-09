const endpoints = {
  nodemailer: "/api/v1/emails/nodemailer",
  sendgrid: "/api/v1/emails/sendgrid",
  ethereal: "/api/v1/emails/ethereal",
  test: "/api/v1/emails/test",
};

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;

  const emailProvider = form.elements["provider"].value;

  const recipients = form.elements["recipients"].value;
  const subject = form.elements["subject"].value;
  const text = form.elements["text"].value;
  const html = form.elements["html"].value;

  const data = {
    recipients: recipients.split(",").map((e) => e.trim()),
    subject,
    body: { text, html },
  };

  console.log(emailProvider, data);

  const url = endpoints[emailProvider];
  if (!url) throw new Error(`Invalid email provider: "${emailProvider}"`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  console.log(result);
  alert(JSON.stringify(result, null, 2));

  form.reset();
});
