import { useState, useEffect, useContext } from 'react';
import { debounce } from 'lodash';

import { StudentService } from '../services';
import { Store } from '../store';
import {
  addStudent,
  addStudents,
  deleteStudent,
  updateStudent,
} from '../store/actions';
import {
  StudentFilters,
  StudentInputs,
  GetAllStudentsResponse,
} from '../services/student';
import { useSmartDataFetch } from './smart-data-fetch';

type UseStudents = {
  loading: boolean;
  data: GetAllStudentsResponse;
  onSearch: (filters: StudentFilters) => void;
  onPageChange: (pageNumber?: number) => void;
  onCreate: (form: StudentInputs) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, form: Partial<StudentInputs>) => void;
  error: any;
};

export function useStudents(): UseStudents {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const [filters, setFilters] = useState<StudentFilters>({});
  const [error, setError] = useState<any>(null);
  const {
    loading: smartFetchLoading,
    data,
    error: smartFetchError,
  } = useSmartDataFetch<GetAllStudentsResponse>(
    StudentService.baseUrl,
    filters
  );

  useEffect(() => {
    if (data) {
      addStudents(data, dispatch);
    }
  }, [data, dispatch]);

  const onSearch = debounce((_filters: StudentFilters = {}) => {
    setFilters({
      ...filters,
      ..._filters,
      page: 1,
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

  const onDelete = async (id: number) => {
    try {
      setLoading(true);
      await StudentService.remove(id);
      deleteStudent(id, dispatch);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (id: number, form: Partial<StudentInputs>) => {
    try {
      setLoading(true);
      const data = await StudentService.update(id, form);
      updateStudent(data, dispatch);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading: loading || smartFetchLoading,
    data: state.students,
    onSearch,
    onPageChange,
    onCreate,
    onDelete,
    onUpdate,
    error: error || smartFetchError,
  };
}
