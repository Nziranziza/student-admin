import { debounce } from 'lodash';
import { useState, useEffect, useContext, useCallback } from 'react';

import { StudyGroupService } from '../services';
import { StudyGroupFilters, StudyGroupInputs, GetAllStudyGroupResponse } from '../services/studyGroup';
import { GetStudentResponse } from '../services/student';
import { Store } from '../store';
import {
  addStudyGroups,
  deleteStudyGroup,
  updateStudyGroup,
  addStudyGroup,
  addStudentToStudyGroup,
  removeStudentFromStudyGroup
} from '../store/actions';

type UseStudyGroups = {
  loading: boolean;
  data: GetAllStudyGroupResponse;
  error: any;
  onSearch: (filters: StudyGroupFilters) => void;
  onPageChange: (pageNumber?: number) => void;
  onCreate: (form: StudyGroupInputs) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, form: Partial<StudyGroupInputs>) => void
};

type UseStudyGroupMembers = {
  onRemove: (groupId: number, student: GetStudentResponse) => void;
  onAdd: (groupId: number, student: GetStudentResponse) => void;
  loading: boolean;
  error: any
}

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

export function useStudyGroupMembers(): UseStudyGroupMembers {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { dispatch } = useContext(Store);

  const onAdd = async (groupId: number, student: GetStudentResponse) => {
    try {
      setLoading(true);
      await StudyGroupService.addMember(groupId, student.id);
      addStudentToStudyGroup({
        id: groupId,
        student
      }, dispatch)
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  const onRemove = async (groupId: number, student: GetStudentResponse) => {
    try {
      setLoading(true);
      await StudyGroupService.removeMember(groupId, student.id);
      removeStudentFromStudyGroup({
        id: groupId,
        student
      }, dispatch)
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  return {
    onRemove,
    onAdd,
    loading,
    error
  }
}