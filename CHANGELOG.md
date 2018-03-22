## 2.1.1 - 22 Mar 2018

- bugs:
  - fixes precision rounding for zero decimals edge case

## 2.1.0 - 22 Mar 2018

- bugs:
	- fixes precision rounding (2 decimals, 0.345 is now converted to 0.35 instead of 0.34)
- deps:
	- mocha@5.0.x
	- should@13.2.x
