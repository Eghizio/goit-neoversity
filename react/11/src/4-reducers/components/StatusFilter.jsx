import { useDispatch } from "react-redux";
import { FilterButton } from "./FilterButton";
import { useFilterStatusSelector } from "../redux/selectors";
import { setStatusFilter } from "../redux/actions";
import { STATUS_FILTERS } from "../constants/filter";

export const StatusFilter = () => {
  const filter = useFilterStatusSelector();
  const dispatch = useDispatch();

  const handleFilterChange = (filter) => dispatch(setStatusFilter(filter));

  const { ALL, ACTIVE, COMPLETED } = STATUS_FILTERS;

  return (
    <div>
      <FilterButton
        selected={filter === ALL}
        onClick={() => handleFilterChange(ALL)}
      >
        All
      </FilterButton>

      <FilterButton
        selected={filter === ACTIVE}
        onClick={() => handleFilterChange(ACTIVE)}
      >
        Active
      </FilterButton>

      <FilterButton
        selected={filter === COMPLETED}
        onClick={() => handleFilterChange(COMPLETED)}
      >
        Completed
      </FilterButton>
    </div>
  );
};
