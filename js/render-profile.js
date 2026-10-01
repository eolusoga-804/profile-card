const config = window.PROFILE_CONFIG;

const profileText = {
  pageTitle: config.site.title,
  availability: config.profile.availability,
  name: config.profile.name,
  role: config.profile.role,
  aboutHeading: config.profile.about.heading,
  aboutText: config.profile.about.text,
  expertiseHeading: config.expertise.heading,
  location: config.profile.location,
};

document.querySelectorAll("[data-profile]").forEach((element) => {
  const key = element.dataset.profile;
  element.textContent = profileText[key];
});

const description = document.querySelector('[data-profile-meta="description"]');
description.content = config.site.description;

const avatar = document.querySelector('[data-profile-image="avatar"]');
avatar.src = config.profile.avatar.src;
avatar.alt = config.profile.avatar.alt;

function getHref(key) {
  const contact = config.contact;

  if (key === "whatsapp") {
    return `https://wa.me/${contact.whatsappNumber}`;
  }

  if (key === "whatsapp-message") {
    const message = encodeURIComponent(config.labels.hireMessage);
    return `https://wa.me/${contact.whatsappNumber}?text=${message}`;
  }

  if (key === "phone") {
    return `tel:${contact.phoneNumber}`;
  }

  if (key === "email") {
    return `mailto:${contact.email}`;
  }

  return contact[key];
}

function addIcon(element, iconClasses) {
  const icon = document.createElement("i");
  icon.className = iconClasses;
  icon.setAttribute("aria-hidden", "true");
  element.append(icon);
}

function addExternalAttributes(link) {
  link.target = "_blank";
  link.rel = "noopener noreferrer";
}

function addVisibleLabel(element, text) {
  const label = document.createElement("span");
  label.textContent = text;
  element.append(label);
}

const socialNavigation = document.querySelector(
  '[data-profile-list="socials"]',
);
socialNavigation.setAttribute("aria-label", config.labels.socialNavigation);

config.socials.forEach((social) => {
  const link = document.createElement("a");
  link.className = "profile-card__social-link";
  link.href = getHref(social.href);

  if (social.icon) {
    addIcon(link, social.icon);
  }

  link.setAttribute("aria-label", social.label);

  if (social.modifier) {
    link.classList.add(`profile-card__social-link--${social.modifier}`);
  }

  if (social.external) {
    addExternalAttributes(link);
  }

  socialNavigation.append(link);
});

const actions = document.querySelector('[data-profile-list="actions"]');

config.actions.forEach((action) => {
  const link = document.createElement("a");
  link.className = "profile-card__button";
  link.href = getHref(action.href);

  if (action.icon) {
    addIcon(link, action.icon);
  }

  addVisibleLabel(link, config.labels[action.label]);

  if (action.modifier) {
    link.classList.add(`profile-card__button--${action.modifier}`);
  }

  if (action.external) {
    addExternalAttributes(link);
  }

  if (action.download) {
    link.download = "";
  }

  actions.append(link);
});
