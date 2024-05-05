use anchor_lang::prelude::*;
// use anchor_spl::token::{Mint, Token, TokenAccount, Transfer};

declare_id!("82FjXcf9un78RSGZFVGyNGaHHqksuz6BMdGtgo3xSYBP");

#[program]
pub mod solana_dao {
    use super::*;

    pub fn create_dao(ctx: Context<CreateDao>, gov_token: Pubkey) -> Result<()> {
        ctx.accounts.dao.governance_token = gov_token;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateDao<'info> {
    #[account(mut)]
    signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        space = 8 + 32,
    )]
    dao: Account<'info, Dao>,
    system_program: Program<'info, System>
}

#[account]
pub struct Dao {
    governance_token: Pubkey
}