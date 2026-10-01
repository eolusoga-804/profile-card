const skillList = document.querySelector('[data-profile-list="skills"]');

window.PROFILE_CONFIG.expertise.skills.forEach((skill) => {
  const item = document.createElement("li");
  item.className = "skill-badges__item";
  item.textContent = skill;
  skillList.append(item);
});
