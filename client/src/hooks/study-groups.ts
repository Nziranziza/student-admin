import { debounce } from 'lodash';
import { useState, useEffect, useContext, useCallback } from 'react';
import { StudyGroupService } from '../services';
import { StudyGroupFilters, StudyGroupInputs } from '../services/studyGroup';

import { Store } from '../store';
import {
  addStudyGroups,
  deleteStudyGroup,
  updateStudyGroup,
  addStudyGroup,
} from '../store/actions';

type UseStudyGroups = {
  loading: boolean;
  data: any;
  error: any;
  onSearch: (filters: StudyGroupFilters) => void;
  onPageChange: (pageNumber?: number) => void;
  onCreate: (form: StudyGroupInputs) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, form: Partial<StudyGroupInputs>) => void
};

export function useStudyGroups(): UseStudyGroups {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const [error, setError] = useState<any>(null);
  const [filters, setFilters] = useState<StudyGroupFilters>({});

  const getStudyGroups = useCallback(async () => {
    try {
      setLoading(true);
      const data = await StudyGroupService.getAll(filters);
      addStudyGroups(data, dispatch);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, filters]);

  useEffect(() => {
    getStudyGroups();
  }, [getStudyGroups]);

  const onSearch = debounce((_filters: StudyGroupFilters = {}) => {
    setFilters({
      ...filters,
      ..._filters,
      page: 1,
    });
  }, 500);

  const onCreate = async (form: StudyGroupInputs) => {
    try {
      setLoading(true);
      const data = await StudyGroupService.create(form);
      addStudyGroup(data, dispatch);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      setLoading(true);
      await StudyGroupService.remove(id);
      deleteStudyGroup(id, dispatch)
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const onUpdate = async (id: number, form: Partial<StudyGroupInputs>) => {
    try {
      setLoading(true)
      const data = await StudyGroupService.update(id, form);
      updateStudyGroup(data, dispatch)
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const onPageChange = (pageNumber?: number) => {
    setFilters({
      ...filters,
      page: pageNumber,
    });
  };

  return {
    loading,
    data: state.studyGroups,
    error,
    onSearch,
    onCreate,
    onUpdate,
    onDelete,
    onPageChange
  };
}
