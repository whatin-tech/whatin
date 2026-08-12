import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        guidance: 'guidance.html',
        admin: 'pages/admin.html',
        notes: 'pages/notes.html',
        placement: 'pages/placement.html',
        login: 'pages/login.html',
        about: 'pages/about.html',
        bsapyp: 'pages/bsapyp.html',
        certificates: 'pages/certificates.html',
        collegepyp: 'pages/collegepyp.html',
        contact: 'pages/contact.html',
        contributors: 'pages/contributors.html',
        disclaimer: 'pages/disclaimer.html',
        game: 'pages/game.html',
        hiring: 'pages/hiring.html',
        jobs: 'pages/jobs.html',
        padhai: 'pages/padhai.html',
        privacy: 'pages/privacy-policy.html',
        quizz: 'pages/quizz.html',
        scholarship: 'pages/scholarship.html',
        team: 'pages/team.html',
        terms: 'pages/terms-conditions.html',
        topper: 'pages/topper.html',
        unitwise: 'pages/unitwise.html',
      }
    }
  }
});
