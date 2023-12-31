import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  //if user's not logged in
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Authortized" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  //if not having reservations
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
export const dynamic = "force-dynamic";
