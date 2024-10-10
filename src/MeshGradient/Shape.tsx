import { Path, Skia } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { createPoints } from "../util/createPoints";

const Shape: React.FC<{
	hash: string;
	color: string;
	index: number;
	canvasWidth: number;
	canvasHeight: number;
}> = ({ hash, color, index, canvasWidth, canvasHeight }) => {
	const pointsSet = useMemo(
		() =>
			createPoints({
				thetaMult: 0.4,
				width: canvasWidth,
				height: canvasHeight,
				index,
				hash,
			}),
		[canvasHeight, canvasWidth, hash, index],
	);
	const pointsValue = useSharedValue(pointsSet);

	const path = useDerivedValue(() => {
		const points = pointsValue.value;
		const skiaPath = Skia.Path.Make();

		if (points.length > 0) {
      if (!points?.[0]?.x) return skiaPath;
			skiaPath.moveTo(points[0].x, points[0].y);
			for (let i = 1; i < points.length - 2; i += 1) {
        const cp = points[i];
				const nextPoint = points[i + 1];
        if (!cp || !nextPoint) return skiaPath;
				skiaPath.quadTo(cp.x, cp.y, nextPoint.x, nextPoint.y);
			}
			skiaPath.close();
		}

		return skiaPath;
	}, [pointsValue]);

	return <Path key={`path_${index}`} path={path} color={color} />;
};

export default Shape;
