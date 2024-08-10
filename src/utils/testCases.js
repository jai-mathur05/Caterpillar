// testCases.js

const inspectionTestCases = [
    {
      id: "INS001",
      header: {
        truckSerialNumber: "730EJ73245",
        truckModel: "730 EJ",
        inspectorName: "John Doe",
        inspectorEmployeeId: "EMP12345",
        dateTime: "2024-08-10T14:30:00",
        location: "Main Depot, Springfield",
        serviceMeterHours: "5000",
        customerName: "Springfield Mining Co.",
        catCustomerId: "CUST9876"
      },
      tires: {
        tirePressureLeftFront: "35 psi",
        tirePressureRightFront: "36 psi",
        tireConditionLeftFront: "Good",
        tireConditionRightFront: "Good",
        tirePressureLeftRear: "40 psi",
        tirePressureRightRear: "38 psi",
        tireConditionLeftRear: "Ok",
        tireConditionRightRear: "Needs replacement",
        overallTireSummary: "Right rear tire shows significant wear and needs replacement. Other tires in good condition."
      },
      battery: {
        batteryMake: "CAT",
        batteryReplacementDate: "2023-05-15",
        batteryVoltage: "12.6V",
        batteryWaterLevel: "Good",
        batteryDamage: "No",
        batteryLeakRust: "No",
        batteryOverallSummary: "Battery in excellent condition, no issues detected."
      },
      exterior: {
        exteriorDamage: "Yes",
        suspensionOilLeak: "No",
        exteriorOverallSummary: "Minor dent on the right side of the cab. No structural issues."
      },
      brakes: {
        brakeFluidLevel: "Good",
        brakeFrontCondition: "Good",
        brakeRearCondition: "Ok",
        emergencyBrake: "Good",
        brakeOverallSummary: "Brakes in good working condition. Rear brakes may need inspection in next service."
      },
      engine: {
        engineDamage: "No",
        engineOilCondition: "Good",
        engineOilColor: "Brown",
        brakeFluidCondition: "Good",
        brakeFluidColor: "Clear",
        engineOilLeak: "No",
        engineOverallSummary: "Engine in excellent condition. No leaks or unusual noises detected."
      },
      customerFeedback: "Customer reported slight vibration at high speeds. Recommended further investigation during next scheduled maintenance."
    },
    {
      id: "INS002",
      header: {
        truckSerialNumber: "735EJBC9723",
        truckModel: "735",
        inspectorName: "Jane Smith",
        inspectorEmployeeId: "EMP67890",
        dateTime: "2024-08-11T09:15:00",
        location: "Quarry Site, Rockville",
        serviceMeterHours: "7500",
        customerName: "Rockville Aggregates Ltd.",
        catCustomerId: "CUST5432"
      },
      tires: {
        tirePressureLeftFront: "32 psi",
        tirePressureRightFront: "33 psi",
        tireConditionLeftFront: "Ok",
        tireConditionRightFront: "Needs replacement",
        tirePressureLeftRear: "37 psi",
        tirePressureRightRear: "36 psi",
        tireConditionLeftRear: "Good",
        tireConditionRightRear: "Ok",
        overallTireSummary: "Right front tire has significant damage and needs immediate replacement. Other tires showing normal wear."
      },
      battery: {
        batteryMake: "XYZ",
        batteryReplacementDate: "2024-01-10",
        batteryVoltage: "12.4V",
        batteryWaterLevel: "Low",
        batteryDamage: "No",
        batteryLeakRust: "Yes",
        batteryOverallSummary: "Battery water level low, signs of rust on terminals. Recommend cleaning and refilling."
      },
      exterior: {
        exteriorDamage: "Yes",
        suspensionOilLeak: "Yes",
        exteriorOverallSummary: "Multiple scratches on the left side. Small oil leak detected in the rear left suspension."
      },
      brakes: {
        brakeFluidLevel: "Low",
        brakeFrontCondition: "Ok",
        brakeRearCondition: "Needs replacement",
        emergencyBrake: "Ok",
        brakeOverallSummary: "Rear brakes worn beyond acceptable limits, require immediate replacement. Brake fluid level low, needs topping up."
      },
      engine: {
        engineDamage: "No",
        engineOilCondition: "Bad",
        engineOilColor: "Black",
        brakeFluidCondition: "Ok",
        brakeFluidColor: "Brown",
        engineOilLeak: "Yes",
        engineOverallSummary: "Engine oil is due for change. Small oil leak detected near the oil pan gasket. Recommend addressing during next service."
      },
      customerFeedback: "Customer complained about reduced braking efficiency and unusual engine noise. Advised to limit use until repairs are completed."
    }
  ];
  
  export default inspectionTestCases;