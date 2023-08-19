<?php
/**
 * Class file for Welcome Page
 * 
 * @package Accessibility_Checker
 */

namespace EDAC;

use EDAC\Scan_Report_Data;

/**
 * Class that handles welcome page
 */
class Welcome_Page {
	

	/**
	 * Renders page summary
	 *
	 * @return void
	 */
	public static function render_summary() {

		$html = '';
		$scan_data = new Scan_Report_Data( 5 );
		$summary = $scan_data->scan_summary();

		
		$html .= '
			<div id="edac_welcome_page_summary">';


		if ( edac_check_plugin_installed( 'accessibility-checker-pro/accessibility-checker-pro.php' ) && EDAC_KEY_VALID ) {
	
			$html .= '
			<section>
				<div class="edac-cols">
				<h3 class="edac-cols-left">
					Most Recent Test Summary
				</h3>

				<p class="edac-cols-right edac-right-text"> 
					<a class="button edac-mr-1" href="' . esc_url( admin_url( 'admin.php?page=accessibility_checker_settings&tab=scan' ) ) . '">Start New Scan</a>
					<a class="button button-primary" href="' . esc_url( admin_url( 'admin.php?page=accessibility_checker_issues' ) ) . '">View All Open Issues</a>
				</p>
				</div>
				<div class="edac-welcome-grid-container">';
			
		
			$html .= '
				<div class="edac-welcome-grid-c1 edac-welcome-grid-item edac-dark-border" style="grid-area: 1 / 1 / span 2;">
					<div class="edac-circle-progress" role="progressbar" aria-valuenow="' . $summary['passed_percentage'] . '" 
						aria-valuemin="0" aria-valuemax="100"
						style="text-align: center; 
						background: radial-gradient(closest-side, white 79%, transparent 80% 100%), 
						conic-gradient(#006600 ' . $summary['passed_percentage'] . '%, #e2e4e7 0);">
						<div class="edac-progress-percentage edac-large-text">' . $summary['passed_percentage'] . '%</div>
						<div class="edac-progress-label edac-small-text">Passed Tests</div>
						
					</div>
				</div>';


			$html .= '
					<div class="edac-welcome-grid-c2 edac-welcome-grid-item' . ( ( $summary['distinct_errors_without_contrast'] > 0 ) ? ' has-errors' : ' has-no-errors' ) . '">
						<div class="edac-inner-row">
							<div class="edac-large-text">' . $summary['distinct_errors_without_contrast'] . '</div>
						</div>
						<div class="edac-inner-row">
							<div class="edac-medium-text">Unique Error' . ( ( 1 == $summary['distinct_errors_without_contrast'] ) ? '' : 's' ) . '</div>
						</div>
					</div>
	
					<div class="edac-welcome-grid-c3 edac-welcome-grid-item' . ( ( $summary['distinct_contrast_errors'] > 0 ) ? ' has-errors' : ' has-no-errors' ) . '">
						<div class="edac-inner-row">
							<div class="edac-large-text">' . $summary['distinct_contrast_errors'] . '</div>
						</div>
						<div class="edac-inner-row">
							<div class="edac-medium-text">Unique Color Constrast Error' . ( ( 1 == $summary['distinct_errors_without_contrast'] ) ? '' : 's' ) . '</div>
						</div>
					</div>

			
					<div class="edac-welcome-grid-c4 edac-welcome-grid-item' . ( ( $summary['distinct_warnings'] > 0 ) ? ' has-warning' : ' has-no-warning' ) . '">
						<div class="edac-inner-row">
							<div class="edac-large-text">' . $summary['distinct_warnings'] . '</div>
						</div>
						<div class="edac-inner-row">
							<div class="edac-medium-text">Unique Warning' . ( ( 1 == $summary['distinct_warnings'] ) ? '' : 's' ) . '</div>
						</div>
					</div>
		

					
			
					<div class="edac-welcome-grid-c5 edac-welcome-grid-item' . ( ( $summary['distinct_ignored'] > 0 ) ? ' has-ignored' : ' has-no-ignored' ) . '">
						<div class="edac-inner-row">
							<div class="edac-large-text">' . $summary['distinct_ignored'] . '</div>
						</div>
						<div class="edac-inner-row">
							<div class="edac-medium-text">Dismissed Issue' . ( ( 1 == $summary['distinct_ignored'] ) ? '' : 's' ) . '</div>
						</div>
					</div>';

			$html .= '
					
				<div class="edac-welcome-grid-c6 edac-welcome-grid-item edac-dark-border">
					<div class="edac-inner-row">
						<div class="edac-medium-text">Average Issues Per Page</div>
					</div>

					<div class="edac-inner-row">
						<div class="edac-large-text">' . $summary['avg_issues_per_post'] . '</div>
					</div>
				</div>

		
				<div class="edac-welcome-grid-c7 edac-welcome-grid-item edac-dark-border">
					<div class="edac-inner-row">
						<div class="edac-medium-text">Average Issue Density</div>
					</div>
					<div class="edac-inner-row">
						<div class="edac-large-text">' . $summary['avg_issue_density_percentage'] . '%</div>
					</div>
				</div>

		
				<div class="edac-welcome-grid-c8 edac-welcome-grid-item edac-dark-border">
					<div class="edac-inner-row">
						<div class="edac-medium-text">Last Full-Site Scan: </div>
					</div>
					<div class="edac-inner-row">
				
					';
				
				if($summary['fullscan_completed_at'] > 0){
					$html .= '
						<div class="edac-large-text edac-timestamp-to-local">' . $summary['fullscan_completed_at'] . '</div>';
				} else {
					$html .= '
						<div class="edac-large-text">Never</div>';
				}

				$html .= '
					</div>
				</div>



				<div class="edac-welcome-grid-c9 edac-welcome-grid-item edac-dark-border">
					<div class="edac-inner-row">
						<div class="edac-large-text">' . $summary['posts_scanned'] . '</div>
					</div>
					<div class="edac-inner-row">
						<div class="edac-medium-text">URLs Scanned</div>
					</div>
				</div>

	
				<div class="edac-welcome-grid-c10 edac-welcome-grid-item edac-dark-border">
					<div class="edac-inner-row">
						<div class="edac-large-text">' . $summary['scannable_post_types_count'] . ' of ' . $summary['public_post_types_count'] . '</div>
					</div>
					<div class="edac-inner-row">
						<div class="edac-medium-text">Post Types Checked</div>
					</div>
				</div>

				<div class="edac-welcome-grid-c11 edac-welcome-grid-item edac-dark-border">
					<div class="edac-inner-row">
						<div class="edac-large-text">' . $summary['posts_without_issues'] . '</div>
					</div>
					<div class="edac-inner-row">
						<div class="edac-medium-text">URLs with 100% score</div>
					</div>
				</div>

			</div>
			</section>';

			
		} else {

		
			if ( true !== boolval( get_user_meta( get_current_user_id(), 'edac_welcome_cta_dismissed', true )) ) {
	
				$html .='
					<section>
					<div class="edac-cols">
						<h3 class="edac-cols-left">
							Site-Wide Accessibility Reports
						</h3>

						<p class="edac-cols-right"> 
							<button id="dismiss_welcome_cta" class="button">Hide banner</button>
						</p>
					</div>
 
					<div class="edac-modal-container edac-desktop"> 
						
					
						<div class="edac-modal">

							<div class="edac-modal-content">

								<h3 class="edac-align-center">Unlock Detailed Accessibility Reports</h3>
								<p class="edac-align-center">Start scanning your entire website for accessibility issues, get full-site reports,
								and become compliant with accessibility guidelines faster.</p>
								<p class="edac-align-center">
									<a class="button" href="https://equalizedigital.com/accessibility-checker/pricing/?utm_source=accessibility-checker&utm_medium=software&utm_campaign=dashboard-widget">
									Upgrade Accessibility Checker
								</a>
								</p>
							</div>	
							
						</div>					
					
					</div>


					<div class="edac-pro-callout edac-mobile">
						<img class="edac-pro-callout-icon" src="' . esc_url( plugin_dir_url( __DIR__ ) ) .'assets/images/edac-emblem.png" alt="Equalize Digital Logo">
						<h4 class="edac-pro-callout-title">Upgrade to Accessibility Checker Pro</h4>
						<div>
							<ul class="edac-pro-callout-list">
								<li>Scan all post types</li>
								<li>Admin columns to see accessibility status at a glance</li>
								<li>Centralized list of all open issues</li>
								<li>Ignore log</li>
								<li>Rename simplified summary</li>
								<li>User restrictions on ignoring issues</li>
								<li>Email support</li>
								<li>...and more</li>
							</ul>
						</div>
						<a class="edac-pro-callout-button" href="https://equalizedigital.com/accessibility-checker/pricing/" target="_blank">Get Accessibility Checker Pro</a>';

					if ( is_plugin_active( 'accessibility-checker-pro/accessibility-checker-pro.php' ) ) {
						$html .='
							<br /><a class="edac-pro-callout-activate" href="' . esc_url( admin_url( 'admin.php?page=accessibility_checker_settings&tab=license' ) ) . 'Or activate your license key here.</a>';
					}
					$html .='
					</div>
					</section>';
			}

		}
		
		$html .= '
		</div>';

		echo $html;
		

	}



}
