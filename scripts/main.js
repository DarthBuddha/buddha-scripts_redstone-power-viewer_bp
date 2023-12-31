// buddha-script_redstone-power-viewer
import { system, world } from "@minecraft/server";

// Use a Map to store last redstone power for each player
const lastRedstonePowerMap = new Map();

system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        const blockHit = player.getBlockFromViewDirection();
        if (!blockHit) {
            if (lastRedstonePowerMap.has(player.name)) {
                player.onScreenDisplay.setActionBar("");
                lastRedstonePowerMap.delete(player.name);
            }
            return;
        }

        const redstonePower = blockHit.block.getRedstonePower();
        const lastRedstonePower = lastRedstonePowerMap.get(player.name);

        if (lastRedstonePower !== redstonePower) {
            player.onScreenDisplay.setActionBar(redstonePower >= 0 ? `${redstonePower}` : "");
            lastRedstonePowerMap.set(player.name, redstonePower);
        }
    });
}, 10); // Consider increasing the interval for performance
