import { watch } from '@nuxtjs/composition-api';
import { useStore } from '@nuxtjs/composition-api';

export const useApiRequest = (requestFunction) => {
  const store = useStore();
  const { state, dispatch } = store;

  const fetchData = async () => {
    await requestFunction();
  };

  watch(() => state.language, fetchData);

  return {
    fetchData,
  };
};
