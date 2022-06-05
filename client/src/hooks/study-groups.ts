import { useState, useEffect, useContext, useCallback } from 'react';
import { StudyGroupService } from '../services';

import { Store } from '../store';
import { addStudyGroups } from '../store/actions';

type UseStudyGroups = {
  loading: boolean;
  data: any[];
  error: any;
};

export function useStudyGroups(): UseStudyGroups {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const [error, setError] = useState<any>(null);

  const getStudyGroups = useCallback(async () => {
    try {
      setLoading(true);
      const data = await StudyGroupService.getAll();
      addStudyGroups(data, dispatch);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getStudyGroups();
  }, [getStudyGroups]);

  return {
    loading,
    data: state.studyGroups,
    error,
  };
}
