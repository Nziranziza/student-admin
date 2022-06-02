import { useState, useEffect } from 'react';

import { StudentService } from '../services';

export function useStudents() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>()

  const getStudents = async () => {
    setLoading(true)
    const data = await  StudentService.getAll();
    setData(data)
    setLoading(false);
  }
  
  useEffect(() => {
    getStudents()
  }, []);

  return {
    loading,
    data
  }
}