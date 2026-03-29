import { onUnmounted } from "vue";
import { useAxios } from "@vueuse/integrations/useAxios";
import { api } from "boot/axios";
import { useMounted } from "@vueuse/core";

export default function useApi() {
  const isMounted = useMounted();

  const { execute, abort, data, isFinished, isLoading, isAborted, response } =
    useAxios(api, {
      immediate: true,
    });

  async function query(url, params = {}) {
    try {
      await execute(url, { method: "GET", params });
      return data.value;
    } catch (error) {
      console.error(error);
    }
  }

  async function mutation(url, method, body = {}, params = {}) {
    try {
      await execute(url, { method, params, data: body });
      const statusStart2 = String(response.value.status).startsWith(2);
      if (!statusStart2) throw new Error(response.value);
      return data.value;
    } catch (error) {
      console.error(error);
    }
  }

  function abortRequest() {
    if (!isFinished.value) {
      abort();
    }
  }

  isMounted.value && onUnmounted(abortRequest);

  return {
    isAborted,
    isLoading,
    isFinished,
    query,
    mutation,
  };
}
