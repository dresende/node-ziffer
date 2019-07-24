## 2.2.2 - 24 Jul 2019

- works around toFixed() known bug related to precision rounding
- deps:
  - mocha@6.2.x

## 2.2.1 - 09 May 2019

- deps:
  - mocha@6.1.x

## 2.2.0 - 09 Oct 2018

- bugs:
  - fixes nasty little bug on precision rounding (example: 9,945 to 1 decimal would throw instead of returning 9,9)

## 2.1.1 - 22 Mar 2018

- bugs:
  - fixes precision rounding for zero decimals edge case

## 2.1.0 - 22 Mar 2018

- bugs:
	- fixes precision rounding (2 decimals, 0.345 is now converted to 0.35 instead of 0.34)
- deps:
	- mocha@5.0.x
	- should@13.2.x
