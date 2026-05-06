/*
Fōrmulæ set package. Module for expression definition & visualization.
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

Sets.drawBrace = function(context, x, y, height, baseline, opening) {
	context.beginPath();

	if (opening) {
		context.moveTo(x + 4, y               );
		context.lineTo(x + 2, y + 2           );
		context.lineTo(x + 2, y + baseline - 2);
		context.lineTo(x,     y + baseline    );
		context.lineTo(x + 2, y + baseline + 2);
		context.lineTo(x + 2, y + height - 2  );
		context.lineTo(x + 4, y + height      );
	}
	else {
		context.moveTo(x - 4, y               );
		context.lineTo(x - 2, y + 2           );
		context.lineTo(x - 2, y + baseline - 2);
		context.lineTo(x,     y + baseline    );
		context.lineTo(x - 2, y + baseline + 2);
		context.lineTo(x - 2, y + height - 2  );
		context.lineTo(x - 4, y + height      );
	}

	context.stroke();
};

Sets.Set = class extends Expression {
	getTag() { return "Set.Set"; }
	getName() { return Sets.messages.nameSet; }
	canHaveChildren(count) { return true; }

	prepareDisplay(context) {
		this.prepareDisplayAsList(context, 8, 8);
	}

	display(context, x, y) {
		Sets.drawBrace(context, x + 4, y, this.height, this.horzBaseline, true);
		this.displayAsList(context, x, y);
		Sets.drawBrace(context, x + this.width - 4, y, this.height, this.horzBaseline, false);
	}
};

Sets.SetBuilder = class extends Expression.BinaryExpression {
	getTag()  { return "Set.SetBuilder"; }
	getName() { return Sets.messages.nameSetBuilder; }

	prepareDisplay(context) {
		const BRACE = 8;

		const child0 = this.children[0];
		const child1 = this.children[1];

		child0.prepareDisplay(context);
		child1.prepareDisplay(context);

		this.barWidth = Math.round(context.measureText(" | ").width);

		this.horzBaseline = Math.max(
			child0.horzBaseline,
			child1.horzBaseline,
			context.fontInfo.semiHeight
		);
		const maxBelow = Math.max(
			child0.height - child0.horzBaseline,
			child1.height - child1.horzBaseline,
			context.fontInfo.semiHeight
		);

		this.height = this.horzBaseline + maxBelow;

		child0.x = BRACE;
		child0.y = this.horzBaseline - child0.horzBaseline;

		child1.x = BRACE + child0.width + this.barWidth;
		child1.y = this.horzBaseline - child1.horzBaseline;

		this.width = BRACE + child0.width + this.barWidth + child1.width + BRACE;
		this.vertBaseline = Math.round(this.width / 2);
	}

	display(context, x, y) {
		const child0 = this.children[0];
		const child1 = this.children[1];

		Sets.drawBrace(context, x + 4, y, this.height, this.horzBaseline, true);

		child0.display(context, x + child0.x, y + child0.y);

		this.drawText(context, " | ", x + child0.x + child0.width, y + this.horzBaseline + Math.round(context.fontInfo.size / 2));

		child1.display(context, x + child1.x, y + child1.y);

		Sets.drawBrace(context, x + this.width - 4, y, this.height, this.horzBaseline, false);
	}
};

Sets.setExpressions = function(module) {
	[
		"Naturals", "Integers", "Rationals", "Reals",
		"Complex", "Primes", "Quaternions"
	].forEach(key => {
		const tag = "Set.Literal.Number." + key;
		Formulae.setExpression(module, tag, {
			clazz:      Expression.Literal,
			getTag:     () => tag,
			getLiteral: () => Sets.messages["literal" + key],
			getName:    () => Sets.messages["name" + key]
		});
	});

	[ "Union", "Intersection" ].forEach(key => {
		const tag = "Set." + key;
		Formulae.setExpression(module, tag, {
			clazz:       Expression.Infix,
			getTag:      () => tag,
			getOperator: () => Sets.messages["operator" + key],
			getName:     () => Sets.messages["name" + key],
			min: -2, max: 2
		});
	});

	[ "Difference", "SymmetricDifference" ].forEach(key => {
		const tag = "Set." + key;
		Formulae.setExpression(module, tag, {
			clazz:       Expression.Infix,
			getTag:      () => tag,
			getOperator: () => Sets.messages["operator" + key],
			getName:     () => Sets.messages["name" + key],
			min: 2, max: 2
		});
	});

	Formulae.setExpression(module, "Set.Empty", {
		clazz:      Expression.Literal,
		getTag:     () => "Set.Empty",
		getLiteral: () => "∅",
		getName:    () => Sets.messages.nameEmpty
	});

	Formulae.setExpression(module, "Set.Complement", {
		clazz:      Expression.SuperscriptedLiteral,
		getTag:     () => "Set.Complement",
		getLiteral: () => "c",
		getName:    () => Sets.messages.nameComplement
	});

	Formulae.setExpression(module, "Set.Set",        Sets.Set);
	Formulae.setExpression(module, "Set.SetBuilder", Sets.SetBuilder);
};
