// src/pages/InspectionForm.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVoiceRecognition, playPrompt, processTranscript } from '../services/VoiceRecognition';
import { submitInspection, getInspectionById, updateInspection } from '../services/api';
import inspectionTestCases from '../utils/testCases';
import styles from './InspectionForm.module.css';

const inspectionSections = [
  { 
    name: 'header', 
    fields: ['truckSerialNumber', 'truckModel', 'inspectorName', 'inspectorEmployeeId', 'dateTime', 'location', 'serviceMeterHours', 'customerName', 'catCustomerId']
  },
  {
    name: 'tires',
    fields: ['tirePressureLeftFront', 'tirePressureRightFront', 'tireConditionLeftFront', 'tireConditionRightFront', 'tirePressureLeftRear', 'tirePressureRightRear', 'tireConditionLeftRear', 'tireConditionRightRear', 'overallTireSummary']
  },
  {
    name: 'battery',
    fields: ['batteryMake', 'batteryReplacementDate', 'batteryVoltage', 'batteryWaterLevel', 'batteryDamage', 'batteryLeakRust', 'batteryOverallSummary']
  },
  {
    name: 'exterior',
    fields: ['exteriorDamage', 'suspensionOilLeak', 'exteriorOverallSummary']
  },
  {
    name: 'brakes',
    fields: ['brakeFluidLevel', 'brakeFrontCondition', 'brakeRearCondition', 'emergencyBrake', 'brakeOverallSummary']
  },
  {
    name: 'engine',
    fields: ['engineDamage', 'engineOilCondition', 'engineOilColor', 'brakeFluidCondition', 'brakeFluidColor', 'engineOilLeak', 'engineOverallSummary']
  },
  {
    name: 'customerFeedback',
    fields: ['customerFeedback']
  }
];

const expectedWords = ['good', 'bad', 'ok', 'needs replacement', 'high', 'low', 'rust', 'broken', 'yes', 'no', 'clean', 'brown', 'black'];

const InspectionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentField, setCurrentField] = useState(0);
  const [formData, setFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { 
    transcript, 
    resetTranscript, 
    listening, 
    startListening, 
    stopListening,
    finalTranscript,
    browserSupportsSpeechRecognition
  } = useVoiceRecognition();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchInspection(id);
    }
  }, [id]);

  const fetchInspection = async (inspectionId) => {
    try {
      const inspection = await getInspectionById(inspectionId);
      setFormData(inspection);
    } catch (error) {
      setSubmitError("Failed to fetch inspection data. Please try again.");
      console.error('Error fetching inspection:', error);
    }
  };

  const currentPrompt = `Please provide ${inspectionSections[currentSection].fields[currentField]}`;

  const processAndSetField = useCallback((text) => {
    const processedText = processTranscript(text, expectedWords);
    setFormData(prevData => ({
      ...prevData,
      [inspectionSections[currentSection].fields[currentField]]: processedText,
    }));
  }, [currentSection, currentField]);

  useEffect(() => {
    if (finalTranscript && !isProcessing) {
      setIsProcessing(true);
      processAndSetField(finalTranscript);
      resetTranscript();
      nextField();
      setIsProcessing(false);
    }
  }, [finalTranscript, processAndSetField, resetTranscript]);

  const nextField = () => {
    if (currentField < inspectionSections[currentSection].fields.length - 1) {
      setCurrentField(currentField + 1);
    } else if (currentSection < inspectionSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentField(0);
    } else {
      stopListening();
    }
  };

  const startInspection = async () => {
    if (browserSupportsSpeechRecognition) {
      await playPrompt(currentPrompt);
      startListening();
    } else {
      alert("Your browser doesn't support speech recognition. Please use a modern browser like Chrome.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let response;
      if (isEditMode) {
        response = await updateInspection(id, formData);
      } else {
        response = await submitInspection(formData);
      }
      alert(response.message);
      navigate('/inspection/list');
    } catch (error) {
      setSubmitError(error.message);
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const populateWithTestCase = () => {
    const testCase = inspectionTestCases[0];  // Use the first test case
    const newFormData = {};
    inspectionSections.forEach(section => {
      section.fields.forEach(field => {
        if (testCase[section.name] && testCase[section.name][field]) {
          newFormData[field] = testCase[section.name][field];
        }
      });
    });
    setFormData(newFormData);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>{isEditMode ? 'Edit Inspection' : 'New Inspection'}</h2>
      {submitError && (
        <div className={styles.errorMessage}>
          <p>{submitError}</p>
          <p>Please try submitting again. If the problem persists, contact support.</p>
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        {inspectionSections.map((section, sectionIndex) => (
          <div key={section.name} className={styles.section}>
            <h3 className={styles.sectionTitle}>{section.name}</h3>
            {section.fields.map((field, fieldIndex) => (
              <div key={field} className={styles.formGroup}>
                <label htmlFor={field} className={styles.label}>{field}</label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field] || ''}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className={styles.input}
                />
              </div>
            ))}
          </div>
        ))}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.button} ${styles.voiceButton}`}
            onClick={startInspection}
            disabled={listening || isProcessing}
          >
            {listening ? 'Listening...' : isProcessing ? 'Processing...' : 'Start Voice Input'}
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.submitButton}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : isEditMode ? 'Update Inspection' : 'Submit Inspection'}
          </button>
          {!isEditMode && (
            <button
              type="button"
              className={`${styles.button} ${styles.testButton}`}
              onClick={populateWithTestCase}
            >
              Populate with Test Case
            </button>
          )}
        </div>
      </form>
      {listening && (
        <div className={styles.transcriptContainer}>
          <p>Current prompt: {currentPrompt}</p>
          <p>Transcript: {transcript}</p>
        </div>
      )}
    </div>
  );
};

export default InspectionForm;