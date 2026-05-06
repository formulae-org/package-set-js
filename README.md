# package-set-js

Set theory package for the [Fōrmulæ](https://formulae.org) programming language.

Fōrmulæ is also a software framework for visualization, edition and manipulation of complex expressions, from many fields. The code for an specific field —i.e. arithmetics— is encapsulated in a single unit called a Fōrmulæ **package**.

This repository contains the source code for the **set package**. It is intended to the visualization and edition of set theory expressions.

The GitHub organization [formulae-org](https://github.com/formulae-org) encompasses the source code for the rest of packages, as well as the [web application](https://github.com/formulae-org/formulae-js).

<!--
Take a look at this [tutorial](https://formulae.org/?script=tutorials/Set) to know the capabilities of the Fōrmulæ set package.
-->

### Capabilities ###

* Visualization of set expressions:
    * Standard number sets: Naturals (ℕ), Integers (ℤ), Rationals (ℚ), Reals (ℝ), Complex (ℂ), Primes (ℙ), Quaternions (ℍ)
    * Empty set (∅)
    * Explicit sets, shown as $`\{ a, b, ..., n \}`$
    * [Set union](https://en.wikipedia.org/wiki/Union_(set_theory)), shown as $A \cup B$
    * [Set intersection](https://en.wikipedia.org/wiki/Intersection_(set_theory)), shown as $A \cap B$
    * [Set difference](https://en.wikipedia.org/wiki/Complement_(set_theory)#Relative_complement), shown as $A \setminus B$
    * [Symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference), shown as $A \triangle B$
    * [Set complement](https://en.wikipedia.org/wiki/Complement_(set_theory)), shown as $A^c$
    * [Set-builder notation](https://en.wikipedia.org/wiki/Set-builder_notation), shown as $\{ x \mid P(x) \}$

* Edition
    * Manual creation of all set expressions via the **Set** menu
    * Manual creation of standard number sets via the **Set > Number sets** submenu
