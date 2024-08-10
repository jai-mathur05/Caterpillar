import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInspections } from '../services/api';
import styles from './InspectionList.module.css';

const InspectionList = () => {
  const [inspections, setInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const data = await getInspections();
        setInspections(data);
      } catch (err) {
        setError('Failed to fetch inspections. Please try again later.');
        console.error('Error fetching inspections:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInspections();
  }, []);

  if (isLoading) return <div className={styles.loading}>Loading inspections...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.title}>Inspection List</h2>
      {inspections.length === 0 ? (
        <p className={styles.noInspections}>No inspections found.</p>
      ) : (
        <ul className={styles.list}>
          {inspections.map((inspection) => (
            <li key={inspection.id} className={styles.listItem}>
              <Link to={`/inspection/${inspection.id}`} className={styles.link}>
                <span className={styles.inspectionId}>{inspection.id}</span>
                <span className={styles.truckInfo}>{inspection.truckModel} - {inspection.truckSerialNumber}</span>
                <span className={styles.date}>{new Date(inspection.submissionDate).toLocaleDateString()}</span>
              </Link>
              <Link to={`/inspection/edit/${inspection.id}`} className={styles.editButton}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/inspection/new" className={styles.newInspectionButton}>Create New Inspection</Link>
    </div>
  );
};

export default InspectionList;