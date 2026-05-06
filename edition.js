/*
Fōrmulæ set package. Module for edition.
Copyright (C) 2015-2026 Laurence R. Ugalde

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';

export class Sets extends Formulae.Package {}

Sets.setEditions = function() {
	[
		"Naturals", "Integers", "Rationals", "Reals",
		"Complex", "Primes", "Quaternions"
	].forEach(key => {
		Formulae.addEdition(
			Sets.messages.pathSetNumber,
			null,
			Sets.messages["leaf" + key],
			() => Expression.replacingEdition("Set.Literal.Number." + key)
		);
	});

	Formulae.addEdition(
		Sets.messages.pathSet,
		null,
		Sets.messages.leafEmpty,
		() => Expression.replacingEdition("Set.Empty")
	);

	Formulae.addEdition(
		Sets.messages.pathSet,
		null,
		Sets.messages.leafSet,
		() => Expression.wrapperEdition("Set.Set")
	);

	[ "Union", "Intersection", "Difference", "SymmetricDifference" ].forEach(key => {
		Formulae.addEdition(
			Sets.messages.pathSet,
			null,
			Sets.messages["leaf" + key],
			() => Expression.binaryEdition("Set." + key, false)
		);
	});

	Formulae.addEdition(
		Sets.messages.pathSet,
		null,
		Sets.messages.leafComplement,
		() => Expression.wrapperEdition("Set.Complement")
	);

	Formulae.addEdition(
		Sets.messages.pathSet,
		null,
		Sets.messages.leafSetBuilder,
		() => Expression.multipleEdition("Set.SetBuilder", 2, 0)
	);
};

Sets.setActions = function() {};
