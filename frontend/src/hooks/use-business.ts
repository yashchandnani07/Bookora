import { useQuery } from "@tanstack/react-query";
import { getMyBusiness } from "@/lib/api/business";

export function useBusinessProfile() {
  return useQuery({
    queryKey: ["business", "me"],
    queryFn: getMyBusiness,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
