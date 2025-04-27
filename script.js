
import {addLoadContentEventHandlers, initReviewsSection} from "./scripts/reviews.js";
import {initAboutUsModal} from "./scripts/about.js";
import {initSkillsSection} from "./scripts/skills.js";
import {initAchievementSection} from "./scripts/achievement.js";
import {initPortfolio} from "./scripts/portfolio.js";
import {sendEmail} from "./scripts/sendEmail.js";
import {initTeamSection} from "./scripts/team.js";
import {setMobileMenu} from "./scripts/mobile.js";

$(document).ready(function () {
  initTeamSection();
  initSkillsSection();
  initAboutUsModal();
  initAchievementSection();
  initReviewsSection();
  initPortfolio();
  setMobileMenu();
  sendEmail();
  addLoadContentEventHandlers();


















});
