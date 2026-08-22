/**
 * Ella Langley Hope Foundation - Front-end Mailto Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Shadow on Scroll
  const navbar = document.getElementById('main-navigation');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('nav-scrolled');
    } else {
      navbar?.classList.remove('nav-scrolled');
    }
  });

  // 2. Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        targetElem?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 3. Mailto Donation Form Handler
  const donationForm = document.getElementById('donation-form');
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullNameElem = document.getElementById('full-name');
      const emailElem = document.getElementById('email');
      const phoneElem = document.getElementById('phone');
      const amountElem = document.getElementById('amount');
      const currencyElem = document.getElementById('currency');
      const purposeElem = document.getElementById('purpose');
      const messageElem = document.getElementById('message');

      const fullName = fullNameElem ? fullNameElem.value.trim() : '';
      const email = emailElem ? emailElem.value.trim() : '';
      const phone = phoneElem ? phoneElem.value.trim() : '';
      const amount = amountElem ? amountElem.value.trim() : '';
      const currency = currencyElem ? currencyElem.value : 'USD';
      const purpose = purposeElem ? purposeElem.value : 'General Fund';
      const message = messageElem ? messageElem.value.trim() : '';

      if (!fullName || !email || !amount) {
        return;
      }

      const currentDate = new Date().toLocaleString();
      const subject = `New Donation Pledge from ${fullName}`;
      const body = `DONATION PLEDGE DETAILS - ELLA LANGLEY HOPE FOUNDATION\n` +
        `--------------------------------------------------\n` +
        `Donor Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'Not Provided'}\n` +
        `Donation Amount: ${currency} ${amount}\n` +
        `Donation Purpose: ${purpose}\n` +
        `Message: ${message || 'None'}\n` +
        `Date & Time: ${currentDate}\n` +
        `--------------------------------------------------\n` +
        `Thank you for your support!`;

      const mailtoUrl = `mailto:ellalangleyfoundation.org@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    });
  }
});
