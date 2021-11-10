[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/utils/date-from-ymd"](_calendar_utils_date_from_ymd_.md)

# Module: "calendar/utils/date-from-ymd"

## Index

### Functions

* [dateFromYMD](_calendar_utils_date_from_ymd_.md#datefromymd)
* [dateFromYMDString](_calendar_utils_date_from_ymd_.md#datefromymdstring)
* [dateToYMD](_calendar_utils_date_from_ymd_.md#datetoymd)

## Functions

###  dateFromYMD

▸ **dateFromYMD**(`year`: string, `month`: string, `day`: string): *Date*

*Defined in [calendar/utils/date-from-ymd.ts:5](https://github.com/gbj/venite/blob/f3d77c77/ldf/src/calendar/utils/date-from-ymd.ts#L5)*

return date from year, month (1-12), and day
defaults to today if any of fields are undefined

**Parameters:**

Name | Type |
------ | ------ |
`year` | string |
`month` | string |
`day` | string |

**Returns:** *Date*

___

###  dateFromYMDString

▸ **dateFromYMDString**(`ymd`: string): *Date*

*Defined in [calendar/utils/date-from-ymd.ts:16](https://github.com/gbj/venite/blob/f3d77c77/ldf/src/calendar/utils/date-from-ymd.ts#L16)*

Transforms a string like `YYYY-mm-dd` to a Date

**Parameters:**

Name | Type |
------ | ------ |
`ymd` | string |

**Returns:** *Date*

___

###  dateToYMD

▸ **dateToYMD**(`date`: Date): *string*

*Defined in [calendar/utils/date-from-ymd.ts:22](https://github.com/gbj/venite/blob/f3d77c77/ldf/src/calendar/utils/date-from-ymd.ts#L22)*

Transform `Date` into YYYY-M-D

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *string*
