import React from "react";
import { Link } from "react-router-dom";

interface TypeRelationListProps {
  title: string;
  types: { name: string }[];
}

export default function TypeRelationList({ title, types }: TypeRelationListProps) {
  return (
    <p>
      <strong>{title}: </strong>
      {types.length > 0 ? (
        types.map((t, i) => (
          <React.Fragment key={t.name}>
            <Link to={`/types/${t.name}`}>{t.name}</Link>
            {i < types.length - 1 && ", "}
          </React.Fragment>
        ))
      ) : (
        <span>None</span>
      )}
    </p>
  );
}
