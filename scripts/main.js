/* Buddha-Script_Redstone */

import * as mc from "@minecraft/server";

mc.system.runInterval(() => {
    const players = mc.world.getAllPlayers();
    for (let player of players) {
        const blockHit = player.getBlockFromViewDirection();

        // Ensure blockHit is valid
        if (!blockHit) {
            // Reset lastRedstonePower if no block is in view
            if (player.lastRedstonePower !== undefined) {
                player.onScreenDisplay.setActionBar("");
                player.lastRedstonePower = undefined;
            }
            continue;
        }

        const block = blockHit.block;
        const redstonePower = block.getRedstonePower();

        // Update action bar only if redstone power has changed
        if (player.lastRedstonePower !== redstonePower) {
            if (redstonePower >= 0) {
                player.onScreenDisplay.setActionBar(`${redstonePower}`);
            } else {
                // Clear the action bar if no redstone power
                player.onScreenDisplay.setActionBar("");
            }
            player.lastRedstonePower = redstonePower;
        }
    }
}, 2);
