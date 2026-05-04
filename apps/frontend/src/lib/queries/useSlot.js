import { useQuery } from "@tanstack/react-query";
import api from "../api";

// 🔹 GET SLOTS BY DATE
export const useSlots = ({ placeId, date }) => {
  return useQuery({
    queryKey: ["slots", placeId, date],
    queryFn: async () => {
      const res = await api.get(`/slot/slots`, {
        params: { placeId, date },
      });
      return res?.data?.data;
    },
    enabled: !!placeId && !!date, // 🔥 important
  });
};

// 🔹 GET SLOT TEMPLATES
export const useSlotTemplates = (placeId) => {
  return useQuery({
    queryKey: ["slotTemplates", placeId],
    queryFn: async () => {
      const res = await api.get(`/slot/template/${placeId}`);
      return res?.data?.data;
    },
    enabled: !!placeId,
  });
};