const { SkillBuilders } = require('ask-sdk-core');

// Funktion zum Verarbeiten des Startintents
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = 'Willkommen beim Skill Helper! Wie kann ich Ihnen heute helfen?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

// Funktion zum Verarbeiten eines benutzerdefinierten Intents
const CustomIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CustomIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'Sie haben den benutzerdefinierten Intent aufgerufen. Wie kann ich Ihnen helfen?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

// Funktion zum Verarbeiten von Stop und Cancel-Intents
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    // Ressourcen freigeben oder Aufräumarbeiten durchführen
    return handlerInput.responseBuilder.getResponse();
  },
};

// Fallback-Handler für unbekannte Anfragen
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'Entschuldigung, ich habe das nicht verstanden. Können Sie das bitte wiederholen?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

// Fehlerhandler
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`Fehler aufgetreten: ${error.message}`);

    const speakOutput = 'Es tut uns leid, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    CustomIntentHandler,
    SessionEndedRequestHandler,
    FallbackIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
