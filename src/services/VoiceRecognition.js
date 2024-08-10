// src/services/voiceRecognition.js
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const CONFIDENCE_THRESHOLD = 0.8; // Adjust this value as needed

export const startListening = (language = 'en-US') => {
  SpeechRecognition.startListening({ continuous: true, language });
};

export const stopListening = () => {
  SpeechRecognition.stopListening();
};

export const useVoiceRecognition = () => {
  const { 
    transcript, 
    resetTranscript, 
    listening,
    isFinalResult,
    finalTranscript,
    interimTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  return {
    transcript,
    resetTranscript,
    listening,
    isFinalResult,
    finalTranscript,
    interimTranscript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition
  };
};

export const playPrompt = (text) => {
  return new Promise((resolve) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.onend = resolve;
    window.speechSynthesis.speak(speech);
  });
};

export const processTranscript = (transcript, expectedWords) => {
  const words = transcript.toLowerCase().split(' ');
  const processedWords = words.map(word => {
    const match = expectedWords.find(expected => 
      expected.toLowerCase() === word || 
      levenshteinDistance(word, expected.toLowerCase()) <= 2
    );
    return match || word;
  });
  return processedWords.join(' ');
};

// Levenshtein distance calculation for fuzzy matching
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}