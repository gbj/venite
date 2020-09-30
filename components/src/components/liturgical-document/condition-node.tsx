import { FunctionalComponent, h, JSX } from "@stencil/core";
import { Condition, LiturgicalDocument } from "@venite/ldf";

export type ConditionNodeProps = {
  doc: LiturgicalDocument;
  localeStrings: Record<string, string>;
}

export const ConditionNode : FunctionalComponent<ConditionNodeProps> = ({ doc, localeStrings }, children) => 
  <div class='condition'>
    <p>
      {localeStrings.condition}
      <code>{localeStrings[doc.condition.mode]}</code>
      {localeStrings.of_the_following}</p>
    <ul>
      {doc.condition.conditions.map(condition => <ConditionPiece condition={condition} localeStrings={localeStrings}/>)}
    </ul>
    {children}
  </div>

type ConditionPieceProps = {
  condition: Condition;
  localeStrings: Record<string, string>
}

const ConditionPiece : FunctionalComponent<ConditionPieceProps> = ({ condition, localeStrings }) => {
  let nodes : JSX.Element[] = [];

  /* Except/Only fields: day, season, week, weekday */
  if(condition.day) {
    nodes = nodes.concat(<ExceptOnly condition={condition} field='day' localeStrings={localeStrings} />)
  }

  if(condition.season) {
    nodes = nodes.concat(<ExceptOnly condition={condition} field='season' localeStrings={localeStrings} />)
  }

  if(condition.week) {
    nodes = nodes.concat(<ExceptOnly condition={condition} field='week' localeStrings={localeStrings} />)
  }

  if(condition.weekday) {
    nodes = nodes.concat(<ExceptOnly condition={condition} field='weekday' localeStrings={localeStrings} />)
  }

  if(condition.hasOwnProperty('feastDay')) {
    nodes.push([
      localeStrings.the_day,
      condition.feastDay ? localeStrings.is : localeStrings.is_not,
      localeStrings.feastDay
    ]);
  }

  if(condition.preference) {
    nodes.push([
      localeStrings.the_preference,
      <code>{condition.preference.key}</code>,
      condition.preference.is ? localeStrings.is : localeStrings.is_not,
      <code>{condition.preference.value}</code>
    ])
  }

  if(condition.date) {
    nodes.push([
      localeStrings.the_date,
      condition.date.lt && `${localeStrings.lt} ${condition.date.lt}`,
      condition.date.lte && `${localeStrings.lte} ${condition.date.lte}`,
      condition.date.gte && `${localeStrings.gte} ${condition.date.gte}`,
      condition.date.gt && `${localeStrings.gt} ${condition.date.gt}`,
    ]);
  }

  return nodes.map(node => <li>{node}</li>);
}

type ExceptOnlyProps = {
  condition: Condition;
  field: string;
  localeStrings: Record<string, string>;
}
const ExceptOnly = ({ condition, field, localeStrings } : ExceptOnlyProps) => {
  const nodes = [];
  condition[field].except?.length > 0 && nodes.push([
    localeStrings[field],
    localeStrings.is,
    condition[field].except.length > 1 ? localeStrings.except : localeStrings.except_1,
    condition[field].except.join(', ')
  ]);
  condition[field].only?.length > 0 && nodes.push([
    localeStrings[field],
    localeStrings.is,
    condition[field].only.length > 1 ? localeStrings.only : localeStrings.only_1,
    condition[field].only.join(', ')
  ]);
  return nodes;
}