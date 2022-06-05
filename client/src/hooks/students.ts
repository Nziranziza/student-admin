import { useState, useEffect, useContext, useCallback } from 'react';
import { debounce } from 'lodash';

import { StudentService } from '../services';
import { Store } from '../store';
import { addStudent, addStudents } from '../store/actions';
import { StudentFilters, StudentInputs } from '../services/student';


type UseStudents = {
  loading: boolean;
  data: any;
  onSearch: (filters: StudentFilters) => void;
  onPageChange: (pageNumber?: number) => void;
  onCreate: (form: StudentInputs) => void;
  error: any;
};

export function useStudents(): UseStudents {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const [filters, setFilters] = useState<StudentFilters>({});
  const [error, setError] = useState<any>(null);

  const getStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await StudentService.getAll(filters);
      addStudents(data, dispatch);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, filters]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const onSearch = debounce((filters: StudentFilters = {}) => {
    setFilters({
      page: 1,
      ...filters
    });
  }, 500);

  const onPageChange = (pageNumber?: number) => {
    setFilters({
      ...filters,
      page: pageNumber,
    });
  };

  const onCreate = async (form: StudentInputs) => {
    try {
      setLoading(true);
      const data = await StudentService.create(form);
      addStudent(data, dispatch);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data: state.students,
    onSearch,
    onPageChange,
    onCreate,
    error,
  };
}
