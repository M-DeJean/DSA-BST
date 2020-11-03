function render_tree(tree) {
	const left = tree.left ? render_tree(tree.left) : {l: [], w: 0};
	const right = tree.right ? render_tree(tree.right) : {l: [], w: 0};
	const top = " " + tree.key + " ";
	const l = [" ".repeat(left.w) + top];
	for (let i = 0; i < left.l.length || i < right.l.length; ++i)
		l.push((left.l[i] || "").padEnd(left.w, " ") + " ".repeat(top.length) + (right.l[i] || ""))
	return {w: left.w + top.length + right.w, l};
}
function show_tree(tree) {render_tree(tree).l.forEach(l => console.log(l));}

module.exports = show_tree