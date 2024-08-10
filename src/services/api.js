// src/services/api.js
let inspections = [];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const submitInspection = async (inspectionData) => {
  await delay(1000);
  
  if (Math.random() < 0.9) { // 90% success rate
    const newInspection = {
      ...inspectionData,
      id: `INS${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      submissionDate: new Date().toISOString()
    };
    inspections.push(newInspection);
    return {
      success: true,
      message: "Inspection submitted successfully",
      id: newInspection.id
    };
  } else {
    throw new Error("Failed to submit inspection. Please try again.");
  }
};

export const getInspections = async () => {
  await delay(500);
  return [...inspections];
};

export const getInspectionById = async (id) => {
  await delay(300);
  const inspection = inspections.find(insp => insp.id === id);
  if (!inspection) {
    throw new Error("Inspection not found");
  }
  return inspection;
};

export const updateInspection = async (id, updatedData) => {
  await delay(1000);
  
  const index = inspections.findIndex(insp => insp.id === id);
  if (index === -1) {
    throw new Error("Inspection not found");
  }
  
  inspections[index] = { ...inspections[index], ...updatedData, lastEditDate: new Date().toISOString() };
  
  return {
    success: true,
    message: "Inspection updated successfully",
    id: id
  };
};