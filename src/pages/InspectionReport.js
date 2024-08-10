// src/pages/InspectionReport.js
import React, { useState, useEffect } from 'react';
import { getInspections } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import styles from './InspectionReport.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const InspectionReport = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      setLoading(true);
      const data = await getInspections();
      setInspections(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch inspections:', error);
      setError('Failed to load inspection data. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading inspection data...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  // Data processing for visualizations
  const truckModelCount = inspections.reduce((acc, inspection) => {
    acc[inspection.truckModel] = (acc[inspection.truckModel] || 0) + 1;
    return acc;
  }, {});

  const truckModelData = Object.keys(truckModelCount).map(model => ({
    name: model,
    count: truckModelCount[model]
  }));

  const criticalIssuesData = inspections.map(inspection => ({
    date: new Date(inspection.dateTime).toLocaleDateString(),
    issues: (inspection.tireConditionLeftFront === 'Needs replacement' ? 1 : 0) +
            (inspection.tireConditionRightFront === 'Needs replacement' ? 1 : 0) +
            (inspection.tireConditionLeftRear === 'Needs replacement' ? 1 : 0) +
            (inspection.tireConditionRightRear === 'Needs replacement' ? 1 : 0) +
            (inspection.brakeCondition === 'Needs replacement' ? 1 : 0) +
            (inspection.engineCondition === 'Bad' ? 1 : 0)
  }));

  const averageTirePressure = inspections.reduce((acc, inspection) => {
    acc.leftFront += parseFloat(inspection.tirePressureLeftFront) || 0;
    acc.rightFront += parseFloat(inspection.tirePressureRightFront) || 0;
    acc.leftRear += parseFloat(inspection.tirePressureLeftRear) || 0;
    acc.rightRear += parseFloat(inspection.tirePressureRightRear) || 0;
    return acc;
  }, { leftFront: 0, rightFront: 0, leftRear: 0, rightRear: 0 });

  Object.keys(averageTirePressure).forEach(key => {
    averageTirePressure[key] /= inspections.length;
  });

  const tirePressureData = [
    { name: 'Left Front', pressure: averageTirePressure.leftFront },
    { name: 'Right Front', pressure: averageTirePressure.rightFront },
    { name: 'Left Rear', pressure: averageTirePressure.leftRear },
    { name: 'Right Rear', pressure: averageTirePressure.rightRear },
  ];

  return (
    <div className={styles.reportContainer}>
      <h1 className={styles.title}>Inspection Analytics Dashboard</h1>
      
      <div className={styles.section}>
        <h2>Truck Models Inspected</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={truckModelData}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {truckModelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className={styles.section}>
        <h2>Critical Issues Over Time</h2>
        <LineChart width={600} height={300} data={criticalIssuesData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="issues" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>

      <div className={styles.section}>
        <h2>Average Tire Pressure</h2>
        <BarChart width={600} height={300} data={tirePressureData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pressure" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className={styles.section}>
        <h2>Recent Inspections</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Truck Model</th>
              <th>Inspector</th>
              <th>Critical Issues</th>
            </tr>
          </thead>
          <tbody>
            {inspections.slice(0, 5).map(inspection => (
              <tr key={inspection._id}>
                <td>{new Date(inspection.dateTime).toLocaleDateString()}</td>
                <td>{inspection.truckModel}</td>
                <td>{inspection.inspectorName}</td>
                <td>{criticalIssuesData.find(d => d.date === new Date(inspection.dateTime).toLocaleDateString()).issues}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectionReport;