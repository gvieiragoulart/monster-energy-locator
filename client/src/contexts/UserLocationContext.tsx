import { createContext, useContext, useState, useCallback } from "react";

interface UserLocationContextType {
  userLocation: { lat: number; lng: number } | undefined;
  isLoadingLocation: boolean;
  handleGetUserLocation: () => void;
}

const UserLocationContext = createContext<UserLocationContextType | undefined>(
  undefined
);

export function UserLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleGetUserLocation = useCallback(() => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        () => setIsLoadingLocation(false)
      );
    } else {
      setIsLoadingLocation(false);
    }
  }, []);

  return (
    <UserLocationContext.Provider
      value={{ userLocation, isLoadingLocation, handleGetUserLocation }}
    >
      {children}
    </UserLocationContext.Provider>
  );
}

export function useUserLocation() {
  const context = useContext(UserLocationContext);
  if (!context) {
    throw new Error("useUserLocation must be used within UserLocationProvider");
  }
  return context;
}
